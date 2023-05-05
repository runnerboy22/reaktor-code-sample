import type { NextApiRequest, NextApiResponse } from 'next';
import { checkVerificationCode } from '../../lib/verify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phoneNumber, code } = req.body;

  try {
    const isValid = await checkVerificationCode(phoneNumber, code);

    if (isValid) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to check OTP' });
  }
}
