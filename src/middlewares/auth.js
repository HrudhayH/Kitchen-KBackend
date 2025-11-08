import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/User.js';

export const protect = async (req, _res, next) => {
  const auth = req.headers.authorization?.split(' ');
  const token = (auth?.[0] === 'Bearer' && auth[1]) || req.cookies?.accessToken;
  if (!token) return next(createError(401, 'Not authenticated'));

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user || !user.isActive) return next(createError(401, 'Invalid user'));
    req.user = { id: user._id, role: user.role, email: user.email };
    next();
  } catch {
    next(createError(401, 'Token invalid/expired'));
  }
};
