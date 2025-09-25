const { deleteFile } = require('./utils/storage.js');
const { getExpiredFiles, deleteFileRecord } = require('./utils/database.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  const expectedToken = process.env.CLEANUP_TOKEN || 'cleanup-secret-token';
  
  if (authHeader !== `Bearer ${expectedToken}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const expiredFiles = await getExpiredFiles();
    
    if (expiredFiles.length === 0) {
      return res.status(200).json({
        message: 'No expired files found',
        cleaned: 0,
      });
    }

    let cleanedCount = 0;
    const errors = [];

    for (const fileRecord of expiredFiles) {
      try {
        const storageDeleted = await deleteFile(fileRecord.id);
        const dbDeleted = await deleteFileRecord(fileRecord.id);
        
        if (storageDeleted && dbDeleted) {
          cleanedCount++;
        } else {
          errors.push({
            fileId: fileRecord.id,
            error: 'Failed to delete from storage or database',
          });
        }
      } catch (error) {
        errors.push({
          fileId: fileRecord.id,
          error: error.message,
        });
      }
    }

    return res.status(200).json({
      message: `Cleanup completed. ${cleanedCount} files removed.`,
      cleaned: cleanedCount,
      total: expiredFiles.length,
      errors: errors.length > 0 ? errors : undefined,
    });

  } catch (error) {
    console.error('Cleanup error:', error);
    return res.status(500).json({ error: 'Cleanup failed' });
  }
}