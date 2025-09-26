// In-memory storage (will reset on serverless function restart)
let fileStore = new Map();

/**
 * Save file metadata
 */
exports.saveFileRecord = async function(fileRecord) {
  try {
    fileStore.set(fileRecord.id, {
      ...fileRecord,
      createdAt: new Date(),
      downloadCount: 0,
    });
    return true;
  } catch (error) {
    console.error('Database save error:', error);
    return false;
  }
};

/**
 * Get file metadata by ID
 */
exports.getFileRecord = async function(fileId) {
  try {
    return fileStore.get(fileId) || null;
  } catch (error) {
    console.error('Database get error:', error);
    return null;
  }
};

/**
 * Update file record
 */
exports.updateFileRecord = async function(fileId, updates) {
  try {
    const existing = fileStore.get(fileId);
    if (!existing) return false;

    fileStore.set(fileId, { ...existing, ...updates });
    return true;
  } catch (error) {
    console.error('Database update error:', error);
    return false;
  }
};

/**
 * Delete file record
 */
exports.deleteFileRecord = async function(fileId) {
  try {
    return fileStore.delete(fileId);
  } catch (error) {
    console.error('Database delete error:', error);
    return false;
  }
};

/**
 * Get all expired files for cleanup
 */
exports.getExpiredFiles = async function() {
  try {
    const now = new Date();
    const expiredFiles = [];
    
    for (const [id, record] of fileStore.entries()) {
      if (new Date(record.expiresAt) <= now) {
        expiredFiles.push(record);
      }
    }
    
    return expiredFiles;
  } catch (error) {
    console.error('Database cleanup query error:', error);
    return [];
  }
};