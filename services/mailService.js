const fetch = require('node-fetch');

exports.sendThresholdNotification = async (email, translationsCount) => {
  try {
    const apiKey = 'your-mail-api-key';  // Use a mailing service like SendGrid or Mailgun
    const url = 'https://api.mailgun.net/v3/your-domain.com/messages';  // Update this URL based on the service you're using

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        from: 'Your App <mail@your-domain.com>',
        to: email,
        subject: `Milestone Reached: ${translationsCount} Translations`,
        text: `Congratulations! You have reached ${translationsCount} translations in your account. Keep up the great work!`
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send notification email');
    }
  } catch (error) {
    console.error('Error sending email notification:', error);
    throw error;
  }
};
