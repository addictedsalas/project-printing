# Nodemailer Email Setup

This document explains how the email functionality is set up in the Project Printing application.

## Overview

The application uses Nodemailer to send emails from the contact form. The email configuration is stored in the `.env` file and used throughout the application.

## Configuration

The email configuration is stored in the `.env` file with the following variables:

```
VITE_SMTP_USER='info@projectprinting.org'
VITE_SMTP_PASS='your-password'
VITE_SMTP_HOST='smtp.hostinger.com'
VITE_SMTP_PORT='465'
```

## Implementation Details

### Server Configuration

The server creates a Nodemailer transporter using the SMTP credentials from the `.env` file:

```javascript
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
```

### Sending Emails

Emails are sent using the `/api/send-email` endpoint, which accepts POST requests with the following structure:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello, I have a question about your services."
}
```

### Testing Email Functionality

You can test the email functionality by running:

```bash
node test-email.mjs
```

This script will:
1. Load the environment variables from the `.env` file
2. Create a Nodemailer transporter with your SMTP credentials
3. Verify the SMTP connection
4. Send a test email to info@projectprinting.org
5. Log the result

## Troubleshooting

If you encounter issues with sending emails, check the following:

1. Verify that your SMTP credentials are correct in the `.env` file
2. Ensure that your SMTP server allows connections from your IP address
3. Check if your email provider has any sending limits
4. Verify that the port (465) is not blocked by your firewall
5. Check the server logs for any error messages

## Security Considerations

- The SMTP password is stored in the `.env` file, which should never be committed to version control
- The application uses secure SMTP (port 465) with TLS encryption
- The server logs mask the password when displaying environment variables

## Contact Form Implementation

The contact form is implemented in `src/pages/Contact.tsx` and sends data to the `/api/send-email` endpoint using a fetch request.
