const { getFile, deleteFile } = require('./utils/storage.js');
const { verifyPassword, isExpired } = require('./utils/crypto.js');
const { getFileRecord, updateFileRecord, deleteFileRecord } = require('./utils/database.js');

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { fileId } = req.query;

  if (!fileId) {
    return res.status(400).json({ error: 'File ID is required' });
  }

  try {
    // Get file metadata
    const fileRecord = await getFileRecord(fileId);
    
    if (!fileRecord) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Check if file has expired
    if (isExpired(fileRecord.expiresAt)) {
      // Clean up expired file
      await deleteFile(fileId);
      await deleteFileRecord(fileId);
      return res.status(404).json({ error: 'File has expired' });
    }

    // Handle GET request - return file info (for download page)
    if (req.method === 'GET') {
      return res.status(200).json({
        originalName: fileRecord.originalName,
        size: fileRecord.size,
        hasPassword: !!fileRecord.passwordHash,
        expiresAt: fileRecord.expiresAt,
        downloadCount: fileRecord.downloadCount,
      });
    }

    // Handle POST request - actual file download
    if (req.method === 'POST') {
      const { password } = req.body;

      // Verify password if required
      if (fileRecord.passwordHash) {
        if (!password) {
          return res.status(401).json({ error: 'Password required' });
        }

        const passwordValid = await verifyPassword(password, fileRecord.passwordHash);
        if (!passwordValid) {
          return res.status(401).json({ error: 'Invalid password' });
        }
      }

      // Get file from storage
      const fileData = await getFile(fileId);
      if (!fileData.success) {
        return res.status(404).json({ error: 'File not found in storage' });
      }

      // Increment download count
      await updateFileRecord(fileId, {
        downloadCount: fileRecord.downloadCount + 1,
      });

      // Delete file after download if configured
      if (fileRecord.deleteAfterDownload) {
        // Schedule deletion (don't wait for it to complete)
        setTimeout(async () => {
          await deleteFile(fileId);
          await deleteFileRecord(fileId);
        }, 1000);
      }

      // Set response headers for file download
      res.setHeader('Content-Type', fileData.contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${fileRecord.originalName}"`);
      res.setHeader('Content-Length', fileData.data.length);
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

      // Send file data
      return res.status(200).send(fileData.data);
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Download failed. Please try again.' });
  }
}
