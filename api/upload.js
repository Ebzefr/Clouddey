// api/upload.js
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
const { createTransport } = nodemailer;
const STORAGE_DIR = '/tmp/clouddey-files';

// Ensure storage directory exists
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

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
const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@clouddey.com',
      to: recipientEmail,
      subject: `File shared with you via Clouddey - ${fileInfo.originalName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #FF6B35;">CLOUDDEY</h1>
          <h2>Someone shared a file with you!</h2>
          <p><strong>File:</strong> ${fileInfo.originalName}</p>
          <p><strong>Size:</strong> ${(fileInfo.size / 1024 / 1024).toFixed(2)} MB</p>
          <p><strong>Expires in:</strong> ${formatExpirationTime(fileInfo.expirationTime)}</p>
          ${fileInfo.hasPassword ? '<p><strong>Password protected</strong></p>' : ''}
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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm({
    uploadDir: STORAGE_DIR,
    keepExtensions: true,
    maxFileSize: 100 * 1024 * 1024,
  });

  try {
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const uploadedFile = files.file?.[0] || files.file;
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const password = fields.password?.[0] || fields.password || null;
    const recipientEmail = fields.recipientEmail?.[0] || fields.recipientEmail || null;
    const expirationTime = fields.expirationTime?.[0] || fields.expirationTime || '1hour';

    const fileId = crypto.randomBytes(16).toString('hex');
    const expiresAt = getExpirationDate(expirationTime);

    const fileInfo = {
      originalName: uploadedFile.originalFilename || 'uploaded-file',
      size: uploadedFile.size,
      contentType: uploadedFile.mimetype || 'application/octet-stream',
      uploadedAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
      expirationTime,
      hasPassword: !!password,
      password: password,
      attemptCount: 0
    };

    const infoPath = path.join(STORAGE_DIR, `${fileId}.json`);
    fs.writeFileSync(infoPath, JSON.stringify(fileInfo, null, 2));

    const finalPath = path.join(STORAGE_DIR, fileId);
    fs.renameSync(uploadedFile.filepath, finalPath);

    const protocol = req.headers['x-forwarded-proto'] || 'http';
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
      const emailSent = await sendEmailNotification(recipientEmail, fileInfo, downloadLink);
      response.emailSent = emailSent;
    }

    return res.status(200).json(response);

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: 'Upload failed: ' + error.message 
    });
  }
}