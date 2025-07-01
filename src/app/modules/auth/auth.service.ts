/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import httpStatus from 'http-status';
import config from '../../config';
import { IAuthUser, ILoginResponse } from './auth.interface';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';

const register = async (payload: IAuthUser) => {
  const { email } = payload;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, 'User already exists');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });

  // Return without password
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

const login = async (
  email: string,
  password: string,
): Promise<ILoginResponse> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const access_token = jwt.sign(
    {
      id: user?._id,
      email: user?.email,
      name: user?.name,
      photoURL: user?.photoURL,
    },
    config.jwt_access_secret as string,
    { expiresIn: config.jwt_access_expires_in } as SignOptions,
  );

  const refresh_token = jwt.sign(
    {
      id: user?._id,
      email: user?.email,
      name: user?.name,
      photoURL: user?.photoURL,
    },
    config.jwt_refresh_secret as string,
    { expiresIn: config.jwt_refresh_expires_in } as SignOptions,
  );

  return {
    access_token,
    refresh_token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      photoURL: user.photoURL,
    },
  };
};

// Dummy for demo - real implementation would involve email service.
const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const resetToken = jwt.sign(
    { id: user._id, email: user.email },
    config.jwt_access_secret as string,
    { expiresIn: '15m' },
  );

  // Send resetToken via email in a real app
  return { resetToken, message: 'Token generated (mock)' };
};

const resetPassword = async (token: string, newPassword: string) => {
  try {
    const decoded = jwt.verify(token, config.jwt_access_secret as string) as {
      id: string;
    };
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashed });
  } catch {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token');
  }
};

const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
) => {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = newHashedPassword;
  await user.save();
};

export const authService = {
  register,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
};
