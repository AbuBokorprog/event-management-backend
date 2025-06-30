import { userService } from './user.service';
import catchAsync from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import httpStatus from 'http-status';

const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users fetched successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await userService.getSingleUser(req.params.id);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User fetched successfully',
    data: user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: user,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data: null,
  });
});

export const userController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
