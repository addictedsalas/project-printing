/**
 * Production entry point for Hostinger
 * This file should be the main entry point for your Node.js application on Hostinger
 */

// Load environment variables
require('dotenv').config();

// Import the server
const { createServer } = require('./server.js');

// Start the server
createServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
