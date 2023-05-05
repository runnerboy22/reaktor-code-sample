'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phoneNumber)) {
      alert('Invalid US phone number.');
      return;
    }

    try {
      const response = await fetch('/api/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: `+1${phoneNumber}` }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/checkotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: `+1${phoneNumber}`, code: otp }),
      });

      if (response.ok) {
        alert('OTP verified!');
        signIn('credentials', {
          phoneNumber,
          redirect: true,
          callbackUrl: '/',
        });
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <label htmlFor="phone">Phone number:</label>
        <input
          type="text"
          id="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          maxLength={10}
        />
        <button onClick={handleSendOtp}>Send OTP</button>
        <label htmlFor="otp">OTP:</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={handleSignIn}>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
