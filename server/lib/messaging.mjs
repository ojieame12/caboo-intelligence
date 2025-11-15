export async function sendWhatsAppMessage({ to, body }) {
  if (!to || !body) return;

  // If Bird not configured, just log
  if (!process.env.BIRD_ACCESS_KEY || !process.env.BIRD_WORKSPACE_ID || !process.env.BIRD_CHANNEL_ID) {
    console.log(`[WhatsApp OUTBOUND - NOT CONFIGURED] -> ${to}: ${body}`);
    return;
  }

  const url = `https://api.bird.com/workspaces/${process.env.BIRD_WORKSPACE_ID}/channels/${process.env.BIRD_CHANNEL_ID}/messages`;

  const payload = {
    receiver: {
      contacts: [
        {
          identifierKey: 'phonenumber',
          identifierValue: to,
        },
      ],
    },
    body: {
      type: 'text',
      text: {
        text: body,
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': process.env.BIRD_ACCESS_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[WhatsApp SEND ERROR]', response.status, errorText);
      throw new Error(`Bird API error: ${response.status}`);
    }

    console.log(`✅ [WhatsApp SENT] -> ${to}: ${body.substring(0, 50)}...`);
  } catch (error) {
    console.error('[WhatsApp SEND FAILED]', error);
    throw error;
  }
}
