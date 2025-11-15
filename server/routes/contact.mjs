import { Router } from 'express';

const router = Router();

router.post('/contact', async (req, res) => {
  const { name, email, restaurant, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  try {
    // TODO: Integrate with email service (SendGrid, Resend, Postmark, etc.)
    console.log('📧 Contact form submission:');
    console.log(`From: ${name} <${email}>`);
    console.log(`Restaurant: ${restaurant || 'Not provided'}`);
    console.log(`Message: ${message}`);

    // For now, just log it. In production, send email:
    // await sendEmail({
    //   to: 'support@caboo.design',
    //   from: email,
    //   subject: `Contact from ${name}${restaurant ? ` (${restaurant})` : ''}`,
    //   text: message,
    //   replyTo: email
    // });

    res.status(200).json({
      message: 'Message received. We\'ll respond within 24 hours.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

export default router;
