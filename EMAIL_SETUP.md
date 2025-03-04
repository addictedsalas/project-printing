# Email Functionality Setup Guide

## Development Mode

In development mode, the contact form uses [Ethereal](https://ethereal.email/) as a test email service. This allows you to test the form submission without actually sending emails to real recipients.

When you submit the form in development mode, you'll receive a toast notification with a link to view the email on Ethereal's website.

## Production Setup

To set up real email sending in production, follow these steps:

1. Update the `.env` file with your SMTP credentials:

```
# SMTP Configuration
VITE_SMTP_USER='your-email@example.com'
VITE_SMTP_PASS='your-password'
VITE_SMTP_HOST='your-smtp-host.com'
VITE_SMTP_PORT='465'
```

2. Update the `server.cjs` file to use your real SMTP credentials instead of Ethereal:

```javascript
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
    
    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});
```

## Troubleshooting

If you encounter issues with email sending, check the following:

1. **SMTP Credentials**: Ensure your username and password are correct.
2. **SMTP Host and Port**: Verify the host and port settings for your email provider.
3. **Authentication Issues**: Some email providers require additional security settings or app passwords.
4. **Server Logs**: Check the server logs for detailed error messages.

## Security Considerations

- Never commit your `.env` file to version control.
- Consider using environment variables in your deployment platform instead of a `.env` file.
- Use a dedicated email account for sending emails from your application.
