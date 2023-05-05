import twilio from 'twilio';

const twilioAccountSID = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioServiceSID = process.env.TWILIO_SERVICE_SID;

const client = twilio(twilioAccountSID, twilioAuthToken);

export async function sendVerificationCode(phoneNumber: string): Promise<void> {
  if (!twilioServiceSID) {
    throw new Error('twilioServiceSID is not set');
  }
  await client.verify.services(twilioServiceSID).verifications.create({
    to: phoneNumber,
    channel: 'sms',
  });
}

export async function checkVerificationCode(
  phoneNumber: string,
  code: string
): Promise<boolean> {
  if (!twilioServiceSID) {
    throw new Error('twilioServiceSID is not set');
  }

  try {
    const check = await client.verify
      .services(twilioServiceSID)
      .verificationChecks.create({
        to: phoneNumber,
        code,
      });

    return check.status === 'approved';
  } catch (error) {
    return false;
  }
}
