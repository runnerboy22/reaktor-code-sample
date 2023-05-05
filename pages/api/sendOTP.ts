import type { NextApiRequest, NextApiResponse } from 'next';
import { sendVerificationCode } from '../../lib/verify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phoneNumber } = req.body;

  try {
    const otp = await sendVerificationCode(phoneNumber);
    res.status(200).json({ otp });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send' });
  }
}
