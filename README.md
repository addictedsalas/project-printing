# Project Printing

A modern web application for Project Printing, featuring a responsive design with React, Vite, and Express.

## Features

- **Modern UI**: Built with React and Tailwind CSS
- **Contact Form**: Integrated email functionality using Nodemailer
- **Responsive Design**: Works on all device sizes
- **Server-Side Integration**: Express.js backend with API endpoints

## Technology Stack

- **Frontend**: React, Tailwind CSS, Radix UI
- **Backend**: Express.js, Node.js
- **Build Tool**: Vite
- **Email Service**: Nodemailer with SMTP

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```sh
git clone <repository-url>
cd project-printing
```

2. Install dependencies
```sh
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
VITE_SMTP_HOST=smtp.hostinger.com
VITE_SMTP_PORT=465
VITE_SMTP_USER=info@projectprinting.org
VITE_SMTP_PASS=your_password_here
```

4. Build the project
```sh
npm run build
```

5. Start the server
```sh
node server.js
```

The application will be available at http://localhost:3000

## Development

To start the development server:
```sh
npm run dev
```

## Email Configuration

This project uses Nodemailer with SMTP for sending emails. See the [NODEMAILER_SETUP.md](./NODEMAILER_SETUP.md) file for detailed configuration instructions.

## License

MIT
