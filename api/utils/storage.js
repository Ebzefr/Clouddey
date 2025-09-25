const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

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

exports.uploadFile = async function(fileId, fileBuffer, contentType, originalName) {
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

exports.getFile = async function(fileId) {
  try {
    const getCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileId,
    });

    const response = await s3Client.send(getCommand);
    
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

exports.deleteFile = async function(fileId) {
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

exports.generateUploadUrl = async function(fileId, expiresIn = 3600) {
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