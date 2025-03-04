// Simple script to test email functionality
// Run with: node test-email.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Initialize dotenv
dotenv.config();

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testEmail() {
  // Check if SMTP credentials are provided
  if (!process.env.VITE_SMTP_USER || !process.env.VITE_SMTP_PASS) {
    console.error('Error: SMTP credentials not found in .env file.');
    console.error('Please make sure your .env file contains VITE_SMTP_USER and VITE_SMTP_PASS variables.');
    process.exit(1);
  }

  console.log('Using SMTP credentials from .env file...');
  console.log(`SMTP User: ${process.env.VITE_SMTP_USER}`);
  console.log(`SMTP Host: ${process.env.VITE_SMTP_HOST || 'smtp.hostinger.com'}`);
  console.log(`SMTP Port: ${process.env.VITE_SMTP_PORT || '465'}`);
  
  const transporter = nodemailer.createTransport({
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

  try {
    // Verify connection configuration
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    
    // Send test email
    const info = await transporter.sendMail({
      from: process.env.VITE_SMTP_USER,
      to: "info@projectprinting.org",
      subject: "Test Email from Project Printing",
      text: "This is a test email to verify the email functionality is working correctly.",
      html: "<p>This is a test email to verify the email functionality is working correctly.</p>",
    });

    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    process.exit(1);
  }
}

testEmail().catch(console.error);
