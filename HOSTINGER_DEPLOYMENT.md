# Hostinger Deployment Guide

This guide provides instructions for deploying the Project Printing application on a Hostinger server.

## Prerequisites

- A Hostinger hosting account with Node.js support
- Access to the Hostinger control panel
- FTP access or Git deployment capability

## Deployment Steps

### 1. Prepare Your Application

Before uploading to Hostinger, make sure you have:

- Built your application with `npm run build`
- Created a `.env` file with your environment variables
- Ensured all dependencies are listed in `package.json`

### 2. Upload Files to Hostinger

#### Option 1: Using FTP

1. Connect to your Hostinger server using FTP credentials
2. Upload all project files to the `public_html` directory
3. Make sure to include:
   - `dist/` directory with built files
   - `server.js` and `hostinger.js`
   - `package.json` and `package-lock.json`
   - `.env` file with your environment variables
   - `.htaccess` file
   - `node_modules/` (or install dependencies on the server)

#### Option 2: Using Git (if available)

1. Push your code to a Git repository
2. Use Hostinger's Git deployment feature to pull your code

### 3. Install Dependencies

Connect to your Hostinger server via SSH and run:

```bash
cd public_html
npm install --production
```

### 4. Configure Node.js Application

In the Hostinger control panel:

1. Go to the "Website" section
2. Click on "Node.js" 
3. Enable Node.js for your domain
4. Set the Node.js version (recommend 16.x or higher)
5. Set the Application startup file to `hostinger.js`
6. Set the Application URL to your domain
7. Save changes

### 5. Environment Variables

Make sure your `.env` file contains:

```
VITE_SMTP_HOST=smtp.hostinger.com
VITE_SMTP_PORT=465
VITE_SMTP_USER=info@projectprinting.org
VITE_SMTP_PASS=your_password_here
NODE_ENV=production
PORT=3000
```

### 6. Restart Application

In the Hostinger control panel:

1. Go to the "Website" section
2. Click on "Node.js"
3. Click "Restart" for your application

### 7. Verify Deployment

Visit your domain to ensure the application is running correctly.

## Troubleshooting

### Application Not Starting

Check the application logs in the Hostinger control panel:

1. Go to the "Website" section
2. Click on "Node.js"
3. Click "Logs" for your application

### Email Not Working

1. Verify your SMTP credentials in the `.env` file
2. Check if the Hostinger SMTP server is accessible
3. Test the email configuration using the test endpoint

### Static Files Not Loading

1. Make sure the `dist` directory is properly uploaded
2. Check that the Express static middleware is correctly configured
3. Verify that the paths in `hostinger.js` are correct

## Additional Resources

- [Hostinger Node.js Hosting Documentation](https://www.hostinger.com/tutorials/how-to-host-node-js-application)
- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
