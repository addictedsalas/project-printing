
import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

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
    from: process.env.SMTP_USER,
    to: "info@projectprinting.org",
    subject: `Nuevo mensaje de contacto: ${data.subject}`,
    text: emailContent,
  };

  return transporter.sendMail(mailOptions);
};
