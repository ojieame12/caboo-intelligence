import { Router } from 'express';
import nodemailer from 'nodemailer';
import { contactFormEmail } from '../templates/email-base.mjs';

const router = Router();

// Create Zoho SMTP transporter
const transporter = process.env.ZOHO_SMTP_PASSWORD ? nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: 'support@caboo.design',
    pass: process.env.ZOHO_SMTP_PASSWORD
  }
}) : null;

router.post('/contact', async (req, res) => {
  const { name, email, restaurant, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  try {
    if (transporter) {
      // Send email via Zoho SMTP with branded template
      await transporter.sendMail({
        from: 'Caboo Support <support@caboo.design>',
        to: 'support@caboo.design', // Send to Zoho inbox
        replyTo: email,
        subject: `Contact from ${name}${restaurant ? ` (${restaurant})` : ''}`,
        html: contactFormEmail({ name, email, restaurant, message })
      });
      console.log(`✅ Email sent from support@caboo.design (via Zoho SMTP)`);
    } else {
      // Fallback: just log if SMTP not configured
      console.log('📧 Contact form submission (Zoho SMTP not configured):');
      console.log(`From: ${name} <${email}>`);
      console.log(`Restaurant: ${restaurant || 'Not provided'}`);
      console.log(`Message: ${message}`);
    }

    res.status(200).json({
      message: 'Message received. We\'ll respond within 24 hours.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

export default router;
