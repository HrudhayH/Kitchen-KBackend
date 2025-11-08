import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/User.js';
import OtpToken from '../models/OtpToken.js';
import { generateOTP, hashOTP, expiresAt } from '../utils/otp.js';
import { sendEmail } from '../utils/email.js';

const signTokens = (userId, role) => {
  const access = jwt.sign({ sub: userId, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  const refresh = jwt.sign({ sub: userId, role, typ: 'refresh' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
  return { access, refresh };
};

export const requestOtp = async (email, purpose='login') => {
  const code = generateOTP(6);
  const otp = await OtpToken.create({
    email,
    purpose,
    otpHash: hashOTP(code),
    expiresAt: expiresAt()
  });
  await sendEmail({
    to: email,
    subject: 'Your Kitchen Kettles OTP',
    html: `<p>Your OTP is <b>${code}</b>. It expires in ${process.env.OTP_EXP_MIN} minutes.</p>`
  });
  return { id: otp._id.toString() };
};

export const verifyOtp = async ({ email, code, purpose='login', name }) => {
  const otpHash = hashOTP(code);
  const record = await OtpToken.findOne({ email, purpose, consumed: false }).sort({ createdAt: -1 });
  if (!record) throw createError(400, 'OTP not found');
  if (record.otpHash !== otpHash) throw createError(400, 'Invalid OTP');
  if (new Date() > record.expiresAt) throw createError(400, 'OTP expired');

  record.consumed = true;
  await record.save();

  let user = await User.findOne({ email });
  if (!user && purpose !== 'forgot') {
    user = await User.create({ email, name: name || email.split('@')[0] });
  }
  if (!user) throw createError(404, 'User not found');

  const { access, refresh } = signTokens(user._id.toString(), user.role);
  return { user, access, refresh };
};
