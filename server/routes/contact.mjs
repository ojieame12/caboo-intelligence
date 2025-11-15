import { Router } from 'express';
import { Resend } from 'resend';
import { contactFormEmail } from '../templates/email-base.mjs';

const router = Router();
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

router.post('/contact', async (req, res) => {
  const { name, email, restaurant, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  try {
    if (resend) {
      // Send email via Resend with branded template
      await resend.emails.send({
        from: 'Caboo Support <support@caboo.design>',
        to: 'nathanojieame@gmail.com',
        replyTo: email,
        subject: `Contact from ${name}${restaurant ? ` (${restaurant})` : ''}`,
        html: contactFormEmail({ name, email, restaurant, message })
      });
      console.log(`✅ Email sent to support@caboo.design from ${email}`);
    } else {
      // Fallback: just log if Resend not configured
      console.log('📧 Contact form submission (Resend not configured):');
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
