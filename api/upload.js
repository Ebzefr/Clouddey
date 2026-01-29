const { put } = require('@vercel/blob');
const { IncomingForm } = require('formidable');  
const fs = require('fs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const getExpirationDate = (expirationTime) => {
  const now = new Date();
  const minutes = {
    '15min': 15,
    '1hour': 60,
    '6hours': 360,
    '24hours': 1440,
    '7days': 10080
  };
  const minutesToAdd = minutes[expirationTime] || 60;
  return new Date(now.getTime() + minutesToAdd * 60000);
};

const formatExpirationTime = (expirationTime) => {
  const options = {
    '15min': '15 minutes',
    '1hour': '1 hour',
    '6hours': '6 hours',
    '24hours': '24 hours',
    '7days': '7 days'
  };
  return options[expirationTime] || '1 hour';
};

const sendEmailNotification = async (recipientEmail, fileInfo, downloadLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    await transporter.sendMail({
      from: '"Clouddey" <' + process.env.EMAIL_USER + '>',
      to: recipientEmail,
      subject: `File shared with you via Clouddey - ${fileInfo.originalName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #FF6B35;">CLOUDDEY</h1>
          <h2>Someone shared a file with you!</h2>
          <p><strong>File:</strong> ${fileInfo.originalName}</p>
          <p><strong>Size:</strong> ${(fileInfo.size / 1024 / 1024).toFixed(2)} MB</p>
          <p><strong>Expires in:</strong> ${formatExpirationTime(fileInfo.expirationTime)}</p>
          ${fileInfo.hasPassword ? '<p><strong>🔒 Password protected</strong></p>' : ''}
          <a href="${downloadLink}" style="background: #FF6B35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0;">Download File</a>
        </div>
      `
    });
    return true;
  } catch (error) {
    console.error('Email failed:', error);
    return false;
  }
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('BLOB_READ_WRITE_TOKEN is not set');
    return res.status(500).json({ error: 'Server configuration error: Blob storage not configured' });
  }

  const form = new IncomingForm({  // ← FIXED
    maxFileSize: 100 * 1024 * 1024,
  });

  try {
    console.log('Starting file upload...');
    
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parse error:', err);
          reject(err);
        } else {
          resolve([fields, files]);
        }
      });
    });

    console.log('Form parsed successfully');

    const uploadedFile = files.file?.[0] || files.file;
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File received:', uploadedFile.originalFilename, uploadedFile.size);

    const password = fields.password?.[0] || fields.password || null;
    const recipientEmail = fields.recipientEmail?.[0] || fields.recipientEmail || null;
    const expirationTime = fields.expirationTime?.[0] || fields.expirationTime || '1hour';

    const fileId = crypto.randomBytes(16).toString('hex');
    const expiresAt = getExpirationDate(expirationTime);

    console.log('Generated fileId:', fileId);

    const fileBuffer = fs.readFileSync(uploadedFile.filepath);
    console.log('File buffer read, size:', fileBuffer.length);
    
    console.log('Uploading to Vercel Blob...');
    const fileBlob = await put(fileId, fileBuffer, {
      access: 'public',
    });
    console.log('File uploaded to Blob:', fileBlob.url);

    const fileInfo = {
      originalName: uploadedFile.originalFilename || uploadedFile.newFilename || 'uploaded-file',
      size: uploadedFile.size,
      contentType: uploadedFile.mimetype || 'application/octet-stream',
      uploadedAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
      expirationTime,
      hasPassword: !!password,
      password: password,
      attemptCount: 0,
      blobUrl: fileBlob.url
    };

    console.log('Uploading metadata...');
    await put(`${fileId}.json`, JSON.stringify(fileInfo), {
      access: 'public',
    });
    console.log('Metadata uploaded');

    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host;
    const downloadLink = `${protocol}://${host}/download/${fileId}`;

    const response = {
      success: true,
      fileId,
      link: downloadLink,
      expiresAt: fileInfo.expiresAt,
      emailSent: false
    };

    if (recipientEmail) {
      console.log('Sending email to:', recipientEmail);
      const emailSent = await sendEmailNotification(recipientEmail, fileInfo, downloadLink);
      response.emailSent = emailSent;
    }

    console.log('Upload complete, returning response');
    return res.status(200).json(response);

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: 'Upload failed: ' + error.message 
    });
  }
};

module.exports.config = {
  api: {
    bodyParser: false,
  },
};