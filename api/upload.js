const formidable = require('formidable');
const fs = require('fs');
const mime = require('mime-types');
const { uploadFile } = require('./utils/storage.js');
const { generateFileId, hashPassword, calculateExpiration, sanitizeFilename } = require('./utils/crypto.js');
const { saveFileRecord } = require('./utils/database.js');

// Move config outside the function
exports.config = {
  api: {
    bodyParser: false,
  },
};

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      maxFileSize: 100 * 1024 * 1024, // 100MB limit
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);

    const password = fields.password?.[0] || null;
    const expirationTime = fields.expirationTime?.[0] || '1hour';
    
    const uploadedFile = files.file?.[0];
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const maxSize = 100 * 1024 * 1024; // 100MB
    if (uploadedFile.size > maxSize) {
      return res.status(400).json({ error: 'File too large. Maximum size is 100MB.' });
    }

    const fileId = generateFileId();
    const originalName = sanitizeFilename(uploadedFile.originalFilename || 'unnamed');
    const contentType = mime.lookup(originalName) || uploadedFile.mimetype || 'application/octet-stream';
    const fileBuffer = fs.readFileSync(uploadedFile.filepath);
    
    let passwordHash = null;
    if (password && password.trim()) {
      passwordHash = await hashPassword(password.trim());
    }

    const expiresAt = calculateExpiration(expirationTime);

    const fileRecord = {
      id: fileId,
      originalName,
      contentType,
      size: uploadedFile.size,
      passwordHash,
      expiresAt,
      deleteAfterDownload: true,
    };

    const uploadSuccess = await uploadFile(fileId, fileBuffer, contentType, originalName);
    if (!uploadSuccess) {
      return res.status(500).json({ error: 'Failed to upload file to storage' });
    }

    const saveSuccess = await saveFileRecord(fileRecord);
    if (!saveSuccess) {
      return res.status(500).json({ error: 'Failed to save file metadata' });
    }

    fs.unlinkSync(uploadedFile.filepath);

    const shareableLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/file/${fileId}`;

    res.status(200).json({
      success: true,
      fileId,
      link: shareableLink,
      expiresAt: expiresAt.toISOString(),
      size: uploadedFile.size,
      originalName,
      hasPassword: !!passwordHash,
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
    
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: 'Unexpected file field' });
    }

    res.status(500).json({ error: 'Upload failed. Please try again.' });
  }
}