// NOTE: This is a simple in-memory store for demo purposes,
// for production a real database will be used

// In-memory storage (will reset on serverless function restart)
let fileStore = new Map();

/**
 * File record structure
 * @typedef {Object} FileRecord
 * @property {string} id - Unique file ID
 * @property {string} originalName - Original filename
 * @property {string} contentType - MIME type
 * @property {number} size - File size in bytes
 * @property {string|null} passwordHash - Hashed password (null if no password)
 * @property {Date} expiresAt - Expiration timestamp
 * @property {Date} createdAt - Upload timestamp
 * @property {number} downloadCount - Number of times downloaded
 * @property {boolean} deleteAfterDownload - Whether to delete after first download
 */

/**
 * Save file metadata
 * @param {FileRecord} fileRecord - File metadata to store
 * @returns {Promise<boolean>} Success status
 */
export async function saveFileRecord(fileRecord) {
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
export async function getFileRecord(fileId) {
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
export async function updateFileRecord(fileId, updates) {
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
export async function deleteFileRecord(fileId) {
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
export async function getExpiredFiles() {
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
export async function getStorageStats() {
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
