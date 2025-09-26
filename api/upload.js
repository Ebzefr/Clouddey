const { IncomingForm } = require('formidable');
const fs = require('fs');
const path = require('path');

const STORAGE_DIR = '/tmp/clouddey-files';

function calculateExpiration(duration) {
  const now = new Date();
  const expirationMap = {
    '15min': 15 * 60 * 1000,
    '1hour': 60 * 60 * 1000,
    '6hours': 6 * 60 * 60 * 1000,
    '24hours': 24 * 60 * 60 * 1000,
    '7days': 7 * 24 * 60 * 60 * 1000,
  };
  const milliseconds = expirationMap[duration] || expirationMap['1hour'];
  return new Date(now.getTime() + milliseconds);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!fs.existsSync(STORAGE_DIR)) {
      fs.mkdirSync(STORAGE_DIR, { recursive: true });
    }

    const form = new IncomingForm({
      maxFileSize: 100 * 1024 * 1024,
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);
    const uploadedFile = files.file?.[0];
    const password = fields.password?.[0] || null;
    const expirationTime = fields.expirationTime?.[0] || '1hour';
    
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileId = Math.random().toString(36).substr(2, 12);
    const expiresAt = calculateExpiration(expirationTime);
    
    // Create file info with password and expiration
    const fileInfo = {
      id: fileId,
      originalName: uploadedFile.originalFilename,
      size: uploadedFile.size,
      contentType: uploadedFile.mimetype,
      uploadedAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
      hasPassword: !!(password && password.trim()),
      password: password && password.trim() ? password.trim() : null,
      attemptCount: 0
    };
    
    const infoPath = path.join(STORAGE_DIR, `${fileId}.json`);
    fs.writeFileSync(infoPath, JSON.stringify(fileInfo, null, 2));
    
    const filePath = path.join(STORAGE_DIR, fileId);
    fs.copyFileSync(uploadedFile.filepath, filePath);
    
    fs.unlinkSync(uploadedFile.filepath);

    return res.status(200).json({
      success: true,
      fileId,
      link: `http://localhost:3000/file/${fileId}`,
      originalName: uploadedFile.originalFilename,
      size: uploadedFile.size,
      hasPassword: fileInfo.hasPassword,
      expiresAt: expiresAt.toISOString()
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed: ' + error.message });
  }
}

module.exports.config = {
  api: { bodyParser: false }
};
