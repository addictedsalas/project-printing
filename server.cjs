// server.cjs - CommonJS version
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Configure middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Log environment variables for debugging
console.log('Environment variables loaded:');
console.log('VITE_SMTP_USER:', process.env.VITE_SMTP_USER);
console.log('VITE_SMTP_PASS:', process.env.VITE_SMTP_PASS ? '[PRESENT]' : '[MISSING]');
console.log('VITE_SMTP_HOST:', process.env.VITE_SMTP_HOST);
console.log('VITE_SMTP_PORT:', process.env.VITE_SMTP_PORT);

// Create email transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.VITE_SMTP_HOST,
    port: parseInt(process.env.VITE_SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.VITE_SMTP_USER,
      pass: process.env.VITE_SMTP_PASS
    }
  });
}

// Test the email configuration
async function testEmailConfig() {
  try {
    const transporter = createTransporter();
    console.log('Testing SMTP connection...');
    const verify = await transporter.verify();
    console.log('SMTP connection verified:', verify);
    return true;
  } catch (error) {
    console.error('SMTP connection failed:', error);
    return false;
  }
}

// Simple test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint called');
  res.json({ message: 'API is working!' });
});

// API endpoint for sending emails
app.post('/api/send-email', async (req, res) => {
  console.log('Email endpoint called with body:', req.body);
  
  try {
    const data = req.body;
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      console.error('Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const emailContent = `
      Nombre: ${data.name}
      Email: ${data.email}
      Asunto: ${data.subject}
      Mensaje: ${data.message}
    `;
    
    const mailOptions = {
      from: process.env.VITE_SMTP_USER,
      to: "info@projectprinting.org",
      subject: `New message from ${data.name}: ${data.subject}`,
      text: emailContent,
    };
    
    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });
    
    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    return res.status(200).json({ message: 'Email sent successfully', id: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// Fallback route for client-side routing - must be after API routes
app.get('*', (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api')) {
    return next();
  }
  
  // For all other routes, serve the index.html file
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;

// Start the server and test email configuration
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`API endpoints available:`);
  console.log(`- GET /api/test`);
  console.log(`- POST /api/send-email`);
  
  // Test email configuration on startup
  testEmailConfig().then(valid => {
    console.log('Email configuration valid:', valid);
    if (!valid) {
      console.warn('Warning: Email configuration is not valid. Contact form will not work correctly.');
    }
  });
});
