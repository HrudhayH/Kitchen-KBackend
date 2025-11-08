
import crypto from 'crypto';
import dayjs from 'dayjs';

export const generateOTP = (len = 6) => {
  const digits = '0123456789';
  let code = '';
  for (let i = 0; i < len; i++) code += digits[Math.floor(Math.random() * 10)];
  return code;
};

export const hashOTP = (code) =>
  crypto.createHash('sha256').update(code).digest('hex');

export const expiresAt = (minutes = Number(process.env.OTP_EXP_MIN || 10)) =>
  dayjs().add(minutes, 'minute').toDate();

