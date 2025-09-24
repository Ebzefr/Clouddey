import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Configure S3 client for Cloudflare R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME;

/**
 * Upload file to cloud storage
 * @param {string} fileId - Unique file identifier
 * @param {Buffer} fileBuffer - File data
 * @param {string} contentType - MIME type
 * @param {string} originalName - Original filename
 * @returns {Promise<boolean>} Success status
 */
export async function uploadFile(fileId, fileBuffer, contentType, originalName) {
  try {
    const uploadCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileId,
      Body: fileBuffer,
      ContentType: contentType,
      Metadata: {
        originalName: originalName,
        uploadedAt: new Date().toISOString(),
      },
    });

    await s3Client.send(uploadCommand);
    return true;
  } catch (error) {
    console.error('Upload error:', error);
    return false;
  }
}

/**
 * Get file from cloud storage
 * @param {string} fileId - Unique file identifier
 * @returns {Promise<{success: boolean, data?: any, contentType?: string, originalName?: string}>}
 */
export async function getFile(fileId) {
  try {
    const getCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileId,
    });

    const response = await s3Client.send(getCommand);
    
    // Convert stream to buffer
    const chunks = [];
    for await (const chunk of response.Body) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    return {
      success: true,
      data: buffer,
      contentType: response.ContentType,
      originalName: response.Metadata?.originalName || 'download',
    };
  } catch (error) {
    console.error('Get file error:', error);
    return { success: false };
  }
}

/**
 * Delete file from cloud storage
 * @param {string} fileId - Unique file identifier
 * @returns {Promise<boolean>} Success status
 */
export async function deleteFile(fileId) {
  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileId,
    });

    await s3Client.send(deleteCommand);
    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
}

/**
 * Generate presigned URL for direct browser upload (alternative approach)
 * @param {string} fileId - Unique file identifier
 * @param {number} expiresIn - URL expiration in seconds
 * @returns {Promise<string>} Presigned URL
 */
export async function generateUploadUrl(fileId, expiresIn = 3600) {
  try {
    const putCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileId,
    });

    const url = await getSignedUrl(s3Client, putCommand, { expiresIn });
    return url;
  } catch (error) {
    console.error('Presigned URL error:', error);
    throw error;
  }
}