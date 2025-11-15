// Email template matching Caboo design system
// Colors: Brand orange #EA580C, Neutral greys, Peachy background #FCF6EF

export const emailTemplate = ({ title, content, ctaText, ctaUrl }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #FAFAFA;">

  <!-- Main Container -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAFA;">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <!-- Email Card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 30px; background-color: #FCF6EF; border-radius: 16px 16px 0 0;">
              <img src="https://res.cloudinary.com/subframe/image/upload/v1763066614/uploads/13740/a9fxbxmydd83ltwoisxc.svg"
                   alt="Caboo"
                   height="32"
                   style="display: block;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <!-- Title -->
              <h1 style="margin: 0 0 24px; font-size: 28px; font-weight: 400; color: #171717; line-height: 1.3;">
                ${title}
              </h1>

              <!-- Body Content -->
              <div style="font-size: 16px; line-height: 1.6; color: #525252;">
                ${content}
              </div>

              ${ctaText && ctaUrl ? `
              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
                <tr>
                  <td style="border-radius: 9999px; background-color: #EA580C;">
                    <a href="${ctaUrl}"
                       style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: 500; color: #FFFFFF; text-decoration: none;">
                      ${ctaText}
                    </a>
                  </td>
                </tr>
              </table>
              ` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #FAFAFA; border-top: 1px solid #E5E5E5;">
              <p style="margin: 0; font-size: 14px; color: #737373; line-height: 1.5;">
                Caboo Intelligence (Pty) Ltd<br>
                Registration: 2025/868763/07<br>
                <a href="https://caboo.design" style="color: #EA580C; text-decoration: none;">caboo.design</a>
              </p>
            </td>
          </tr>

        </table>

        <!-- Unsubscribe -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
          <tr>
            <td align="center">
              <p style="margin: 0; font-size: 12px; color: #A3A3A3;">
                © 2025 Caboo Intelligence •
                <a href="https://caboo.design/privacy" style="color: #A3A3A3;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

// Contact form submission email (internal)
export const contactFormEmail = ({ name, email, restaurant, message }) => {
  const content = `
    <p style="margin-bottom: 24px;">You received a new message from the contact form:</p>

    <table style="width: 100%; margin-bottom: 24px; background-color: #F5F5F5; border-radius: 8px; padding: 20px;">
      <tr>
        <td style="padding: 8px 0;">
          <strong style="color: #171717;">Name:</strong><br>
          <span style="color: #525252;">${name}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">
          <strong style="color: #171717;">Email:</strong><br>
          <a href="mailto:${email}" style="color: #EA580C;">${email}</a>
        </td>
      </tr>
      ${restaurant ? `
      <tr>
        <td style="padding: 8px 0;">
          <strong style="color: #171717;">Restaurant:</strong><br>
          <span style="color: #525252;">${restaurant}</span>
        </td>
      </tr>
      ` : ''}
    </table>

    <div style="background-color: #FCF6EF; border-left: 4px solid #EA580C; padding: 20px; border-radius: 8px;">
      <p style="margin: 0; color: #404040; white-space: pre-wrap;">${message}</p>
    </div>

    <p style="margin-top: 24px; font-size: 14px; color: #737373;">
      Reply directly to this email to respond to ${name}.
    </p>
  `;

  return emailTemplate({
    title: `New contact from ${name}`,
    content
  });
};

// Welcome email example
export const welcomeEmail = ({ restaurantName }) => {
  const content = `
    <p>Welcome to Caboo! We're excited to help you transform your WhatsApp into an intelligent booking assistant.</p>

    <p style="margin-top: 20px;">Your account for <strong>${restaurantName}</strong> is ready. Here's what happens next:</p>

    <ol style="line-height: 1.8; color: #525252;">
      <li>Connect your WhatsApp Business account (takes 5 minutes)</li>
      <li>Your bot goes live immediately</li>
      <li>Start capturing bookings and reducing no-shows</li>
    </ol>

    <p style="margin-top: 20px;">Questions? Reply to this email or visit our help center.</p>
  `;

  return emailTemplate({
    title: `Welcome to Caboo, ${restaurantName}!`,
    content,
    ctaText: 'Connect WhatsApp Now',
    ctaUrl: 'https://caboo.design/onboarding/connect'
  });
};
