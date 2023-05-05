import twilio from 'twilio';

const twilioAccountSID = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(twilioAccountSID, twilioAuthToken);

export async function sendVerificationCode(phoneNumber: string): Promise<void> {
  if (!twilioAccountSID) {
    throw new Error('twilioAccountSID is not set');
  }
  await client.verify.services(twilioAccountSID).verifications.create({
    to: phoneNumber,
    channel: 'sms',
  });
}

export async function checkVerificationCode(
  phoneNumber: string,
  code: string
): Promise<boolean> {
  try {
    if (!twilioAccountSID) {
      throw new Error('twilioAccountSID is not set');
    }
    const check = await client.verify
      .services(twilioAccountSID)
      .verificationChecks.create({
        to: phoneNumber,
        code,
      });

    return check.status === 'approved';
  } catch (error) {
    return false;
  }
}
