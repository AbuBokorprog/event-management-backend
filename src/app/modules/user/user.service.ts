import { User } from './user.model';
import { IUser } from './user.interface';
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';

const getAllUsers = async (): Promise<IUser[]> => {
  return User.find({}, { password: 0 });
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  return user;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  return User.findByIdAndDelete(id);
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select('-password');
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  return user;
};

export const userService = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
};
