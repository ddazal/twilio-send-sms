require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const data = {
  numbers: [
    '+18483211234',
    '+14151234567',
    '+19103217654',
    '+12314567890',
    '+17076543210',
  ],
};

async function notifyBySMS(body, numbers) {
  const messages = numbers.map((number) => client.messages.create({
    body,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: number,
  }));
  const results = await Promise.allSettled(messages);
  results.forEach(({ status, value, reason }) => {
    if (status === 'fulfilled') {
      // eslint-disable-next-line no-console
      console.log(`SMS sent with sid ${value.sid} to ${value.to}`);
    } else {
      // eslint-disable-next-line no-console
      console.log(reason.message);
    }
  });
}

notifyBySMS('Hello from Twilio', data.numbers).catch((error) => {
  // eslint-disable-next-line no-console
  console.log(error.message);
  // Send to an error tracking service like Sentry
  process.exit(1);
});
