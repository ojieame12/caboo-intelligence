import { Router } from 'express';
import { sendWhatsAppMessage } from '../lib/messaging.mjs';

const router = Router();

// Quick test endpoint - remove after testing
router.post('/test-whatsapp', async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: 'Need "to" and "message"' });
  }

  try {
    await sendWhatsAppMessage({ to, body: message });
    res.json({ success: true, message: `Sent to ${to}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
