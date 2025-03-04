import * as nodemailer from 'nodemailer';

// Get environment variables from the appropriate source
const getEnvVar = (name: string) => {
  // When running in Node.js (server-side)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[name];
  }
  // When running in browser (client-side with Vite)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[name];
  }
  return undefined;
};

// Create transporter with environment variables
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: getEnvVar('VITE_SMTP_USER'),
      pass: getEnvVar('VITE_SMTP_PASS')
    }
  });
};

export const sendEmail = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const emailContent = `
    Nombre: ${data.name}
    Email: ${data.email}
    Asunto: ${data.subject}
    Mensaje: ${data.message}
  `;

  const mailOptions = {
    from: getEnvVar('VITE_SMTP_USER'),
    to: "info@projectprinting.org",
    subject: `Nuevo mensaje de contacto: ${data.subject}`,
    text: emailContent,
  };

  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
