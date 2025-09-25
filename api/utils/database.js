// NOTE: This is a simple in-memory store for demo purposes
// For production, replace with a real database like Vercel KV, PlanetScale, or Supabase

// In-memory storage (will reset on serverless function restart)
let fileStore = new Map();

/**
 * Save file metadata
 * @param {FileRecord} fileRecord - File metadata to store
 * @returns {Promise<boolean>} Success status
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
}

/**
 * Get file metadata by ID
 * @param {string} fileId - File ID
 * @returns {Promise<FileRecord|null>} File record or null if not found
 */
exports.getFileRecord = async function(fileId) {
  try {
    return fileStore.get(fileId) || null;
  } catch (error) {
    console.error('Database get error:', error);
    return null;
  }
}

/**
 * Update file record (e.g., increment download count)
 * @param {string} fileId - File ID
 * @param {Partial<FileRecord>} updates - Fields to update
 * @returns {Promise<boolean>} Success status
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
}

/**
 * Delete file record
 * @param {string} fileId - File ID
 * @returns {Promise<boolean>} Success status
 */
exports.deleteFileRecord = async function(fileId) {
  try {
    return fileStore.delete(fileId);
  } catch (error) {
    console.error('Database delete error:', error);
    return false;
  }
}

/**
 * Get all expired files for cleanup
 * @returns {Promise<FileRecord[]>} Array of expired file records
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
}

/**
 * Get total file count and storage stats
 * @returns {Promise<{totalFiles: number, totalSize: number}>} Storage statistics
 */
exports.getStorageStats = async function() {
  try {
    let totalFiles = 0;
    let totalSize = 0;

    for (const record of fileStore.values()) {
      totalFiles++;
      totalSize += record.size || 0;
    }

    return { totalFiles, totalSize };
  } catch (error) {
    console.error('Database stats error:', error);
    return { totalFiles: 0, totalSize: 0 };
  }
}