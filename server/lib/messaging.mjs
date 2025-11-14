export async function sendWhatsAppMessage({ to, body }) {
  if (!to || !body) return
  console.log(`[WhatsApp OUTBOUND] -> ${to}: ${body}`)
  // TODO: integrate with Bird/Twilio provider
}
