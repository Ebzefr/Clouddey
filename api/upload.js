import formidable from 'formidable';
import fs from 'fs';
import mime from 'mime-types';
import { uploadFile } from './utils/storage.js';
import { generateFileId, hashPassword, calculateExpiration, sanitizeFilename } from './utils/crypto.js';
import { saveFileRecord } from './utils/database.js';

// Disable body parsing to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
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
    // Parse the multipart form data
    const form = formidable({
      maxFileSize: 100 * 1024 * 1024, // 100MB limit
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);

    // Extract form fields
    const password = fields.password?.[0] || null;
    const expirationTime = fields.expirationTime?.[0] || '1hour';
    
    // Get the uploaded file
    const uploadedFile = files.file?.[0];
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Validate file
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (uploadedFile.size > maxSize) {
      return res.status(400).json({ error: 'File too large. Maximum size is 100MB.' });
    }

    // Generate unique file ID
    const fileId = generateFileId();
    
    // Get file info
    const originalName = sanitizeFilename(uploadedFile.originalFilename || 'unnamed');
    const contentType = mime.lookup(originalName) || uploadedFile.mimetype || 'application/octet-stream';
    
    // Read file buffer
    const fileBuffer = fs.readFileSync(uploadedFile.filepath);
    
    // Hash password if provided
    let passwordHash = null;
    if (password && password.trim()) {
      passwordHash = await hashPassword(password.trim());
    }

    // Calculate expiration
    const expiresAt = calculateExpiration(expirationTime);

    // Create file record
    const fileRecord = {
      id: fileId,
      originalName,
      contentType,
      size: uploadedFile.size,
      passwordHash,
      expiresAt,
      deleteAfterDownload: true, // Always delete after first download for security
    };

    // Upload to cloud storage
    const uploadSuccess = await uploadFile(fileId, fileBuffer, contentType, originalName);
    if (!uploadSuccess) {
      return res.status(500).json({ error: 'Failed to upload file to storage' });
    }

    // Save metadata to database
    const saveSuccess = await saveFileRecord(fileRecord);
    if (!saveSuccess) {
      // Cleanup: try to delete from storage if database save failed
      // await deleteFile(fileId); // Uncomment if needed
      return res.status(500).json({ error: 'Failed to save file metadata' });
    }

    // Clean up temporary file
    fs.unlinkSync(uploadedFile.filepath);

    // Generate shareable link
    const shareableLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/file/${fileId}`;

    // Return success response
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
    
    // Handle specific errors
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
    
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: 'Unexpected file field' });
    }

    res.status(500).json({ error: 'Upload failed. Please try again.' });
  }
}