import { sendEmail } from '@/lib/email';
import type { Request, Response } from 'express';

// This is a simple API endpoint to handle email sending
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    await sendEmail(data);
    
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
