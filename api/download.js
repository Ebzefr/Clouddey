const { head, del } = require('@vercel/blob');

function isExpired(expirationDate) {
  return new Date() > new Date(expirationDate);
}

module.exports = async function handler(req, res) {
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
    // Get file metadata from Blob
    let fileInfo;
    try {
      const metadataResponse = await fetch(`https://${process.env.BLOB_READ_WRITE_TOKEN.split('_')[0]}.public.blob.vercel-storage.com/${fileId}.json`);
      if (!metadataResponse.ok) {
        return res.status(404).json({ error: 'File not found' });
      }
      fileInfo = await metadataResponse.json();
    } catch (error) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Check if file has expired
    if (isExpired(fileInfo.expiresAt)) {
      try {
        await del([`${fileId}`, `${fileId}.json`], {
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
      } catch (e) {
        console.error('Error deleting expired file:', e);
      }
      return res.status(410).json({ error: 'File has expired' });
    }

    // Check if max attempts reached
    if (fileInfo.hasPassword && fileInfo.attemptCount >= 2) {
      return res.status(403).json({ 
        error: 'Maximum password attempts exceeded.',
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
      let body = {};
      if (req.body) {
        body = req.body;
      } else {
        const buffers = [];
        for await (const chunk of req) {
          buffers.push(chunk);
        }
        const data = Buffer.concat(buffers).toString();
        try {
          body = JSON.parse(data);
        } catch (e) {
          body = {};
        }
      }

      // Check password
      if (fileInfo.hasPassword) {
        const { password } = body;
        
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
              await del([`${fileId}`, `${fileId}.json`], {
                token: process.env.BLOB_READ_WRITE_TOKEN,
              });
            } catch (e) {
              console.error('Error deleting file:', e);
            }
            return res.status(403).json({ 
              error: 'Maximum password attempts exceeded.',
              remainingAttempts: 0
            });
          } else {
            // Update attempt count
            const { put } = require('@vercel/blob');
            await put(`${fileId}.json`, JSON.stringify(fileInfo), {
              access: 'public',
              token: process.env.BLOB_READ_WRITE_TOKEN,
            });
            return res.status(401).json({ 
              error: 'Invalid password',
              remainingAttempts: 2 - fileInfo.attemptCount
            });
          }
        }
      }

      // Download file from Blob
      const fileResponse = await fetch(fileInfo.blobUrl);
      if (!fileResponse.ok) {
        return res.status(404).json({ error: 'File data not found' });
      }

      const fileBuffer = Buffer.from(await fileResponse.arrayBuffer());
      
      // Delete files after successful download
      try {
        await del([`${fileId}`, `${fileId}.json`], {
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
      } catch (deleteError) {
        console.error('Error deleting files:', deleteError);
      }
      
      res.setHeader('Content-Type', fileInfo.contentType || 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(fileInfo.originalName)}"`);
      res.setHeader('Content-Length', fileBuffer.length);
      
      return res.status(200).send(fileBuffer);
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Download error:', error);
    return res.status(500).json({ error: 'Download failed: ' + error.message });
  }
};

module.exports.config = {
  api: {
    bodyParser: true,
  },
};