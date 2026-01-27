// api/download.js
import fs from 'fs';
import path from 'path';

const STORAGE_DIR = '/tmp/clouddey-files';

function isExpired(expirationDate) {
  return new Date() > new Date(expirationDate);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
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
    const infoPath = path.join(STORAGE_DIR, `${fileId}.json`);
    
    if (!fs.existsSync(infoPath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    const fileInfo = JSON.parse(fs.readFileSync(infoPath, 'utf8'));

    // Check if file has expired
    if (isExpired(fileInfo.expiresAt)) {
      try {
        const filePath = path.join(STORAGE_DIR, fileId);
        fs.unlinkSync(filePath);
        fs.unlinkSync(infoPath);
      } catch (e) {}
      return res.status(410).json({ error: 'File has expired' });
    }

    // Check if max attempts already reached
    if (fileInfo.hasPassword && fileInfo.attemptCount >= 2) {
      return res.status(403).json({ 
        error: 'Maximum password attempts exceeded. File has been permanently deleted.',
        remainingAttempts: 0
      });
    }

    if (req.method === 'GET') {
      return res.status(200).json({
        originalName: fileInfo.originalName,
        size: fileInfo.size,
        hasPassword: fileInfo.hasPassword,
        expiresAt: fileInfo.expiresAt,
        remainingAttempts: fileInfo.hasPassword ? Math.max(0, 2 - (fileInfo.attemptCount || 0)) : null
      });
    }

    if (req.method === 'POST') {
      // Check password if required
      if (fileInfo.hasPassword) {
        const { password } = req.body;
        
        if (!password) {
          return res.status(400).json({ 
            error: 'Password is required',
            remainingAttempts: Math.max(0, 2 - (fileInfo.attemptCount || 0))
          });
        }
        
        if (password !== fileInfo.password) {
          fileInfo.attemptCount = (fileInfo.attemptCount || 0) + 1;
          
          if (fileInfo.attemptCount >= 2) {
            try {
              const filePath = path.join(STORAGE_DIR, fileId);
              fs.unlinkSync(filePath);
              fs.writeFileSync(infoPath, JSON.stringify(fileInfo, null, 2));
            } catch (e) {
              console.error('Error deleting file:', e);
            }
            return res.status(403).json({ 
              error: 'Maximum password attempts exceeded. File has been permanently deleted.',
              remainingAttempts: 0
            });
          } else {
            fs.writeFileSync(infoPath, JSON.stringify(fileInfo, null, 2));
            const remaining = 2 - fileInfo.attemptCount;
            return res.status(401).json({ 
              error: 'Invalid password',
              remainingAttempts: remaining
            });
          }
        }
      }
      
      const filePath = path.join(STORAGE_DIR, fileId);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File data not found' });
      }

      const fileBuffer = fs.readFileSync(filePath);
      
      // Delete files after successful download
      try {
        fs.unlinkSync(filePath);
        fs.unlinkSync(infoPath);
      } catch (deleteError) {
        console.error('Error deleting files:', deleteError);
      }
      
      res.setHeader('Content-Type', fileInfo.contentType || 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${fileInfo.originalName}"`);
      res.setHeader('Content-Length', fileBuffer.length);
      
      return res.status(200).send(fileBuffer);
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Download error:', error);
    return res.status(500).json({ error: 'Download failed: ' + error.message });
  }
}