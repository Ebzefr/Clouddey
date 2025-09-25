const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');

/**
 * Generate a unique, URL-safe file ID
 * @param {number} length - Length of the ID (default: 12)
 * @returns {string} Unique file ID
 */
exports.generateFileId = function(length = 12){
  return nanoid(length);
}

/**
 * Generate a secure download token
 * @param {number} length - Length of the token (default: 21)
 * @returns {string} Unique download token
 */
exports.generateDownloadToken = function(length = 21) {
  return nanoid(length);
}

/**
 * Hash password for storage
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
exports.hashPassword = async function (password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Verify password against hash
 * @param {string} password - Plain text password
 * @param {string} hash - Stored password hash
 * @returns {Promise<boolean>} Whether password matches
 */
exports.verifyPassword = async function (password, hash) {
  return await bcrypt.compare(password, hash);
}

/**
 * Calculate expiration timestamp
 * @param {string} duration - Duration string ('15min', '1hour', '6hours', '24hours', '7days')
 * @returns {Date} Expiration date
 */
exports.calculateExpiration = function (duration) {
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

/**
 * Check if file has expired
 * @param {Date|string} expirationDate - Expiration date
 * @returns {boolean} Whether file has expired
 */
exports.isExpired = function (expirationDate) {
  const now = new Date();
  const expiry = new Date(expirationDate);
  return now > expiry;
}

/**
 * Sanitize filename to prevent path traversal and other issues
 * @param {string} filename - Original filename
 * @returns {string} Sanitized filename
 */
exports.sanitizeFilename = function(filename) {
  // Remove path separators and other dangerous characters
  return filename
    .replace(/[\/\\:*?"<>|]/g, '_')
    .replace(/\.\./g, '_')
    .substring(0, 255); // Limit length
}