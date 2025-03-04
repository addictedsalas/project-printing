// server.js
import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Log environment variables for debugging
console.log('Environment variables loaded:');
console.log('VITE_SMTP_USER:', process.env.VITE_SMTP_USER);
console.log('VITE_SMTP_PASS:', process.env.VITE_SMTP_PASS ? '[PRESENT]' : '[MISSING]');

// Create email transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.VITE_SMTP_HOST || "smtp.hostinger.com",
    port: parseInt(process.env.VITE_SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.VITE_SMTP_USER,
      pass: process.env.VITE_SMTP_PASS
    },
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false
    }
  });
}

// Test the email configuration
async function testEmailConfig() {
  try {
    const transporter = createTransporter();
    const verify = await transporter.verify();
    console.log('SMTP connection verified:', verify);
    return true;
  } catch (error) {
    console.error('SMTP connection failed:', error);
    return false;
  }
}

async function createServer() {
  const app = express();
  
  // Test email configuration on startup
  const emailConfigValid = await testEmailConfig();
  console.log('Email configuration valid:', emailConfigValid);
  
  // Configure CORS
  app.use(cors());
  
  // Configure body parser
  app.use(bodyParser.json());
  
  // Serve static files from dist directory
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  
  // API endpoints
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
        subject: `Nuevo mensaje de contacto: ${data.subject}`,
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
  
  // Use vite's connect instance as middleware - should be after our routes
  app.use(vite.middlewares);
  
  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`API endpoints available:`);
    console.log(`- GET /api/test`);
    console.log(`- POST /api/send-email`);
  });
}

createServer().catch(console.error);
