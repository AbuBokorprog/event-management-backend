"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const http_status_1 = __importDefault(require("http-status"));
const getAllUsers = (0, catchAsync_1.default)(async (req, res) => {
    const users = await user_service_1.userService.getAllUsers();
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Users fetched successfully',
        data: users,
    });
});
const getSingleUser = (0, catchAsync_1.default)(async (req, res) => {
    const user = await user_service_1.userService.getSingleUser(req.params.id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User fetched successfully',
        data: user,
    });
});
const updateUser = (0, catchAsync_1.default)(async (req, res) => {
    const user = await user_service_1.userService.updateUser(req.params.id, req.body);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User updated successfully',
        data: user,
    });
});
const deleteUser = (0, catchAsync_1.default)(async (req, res) => {
    await user_service_1.userService.deleteUser(req.params.id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User deleted successfully',
        data: null,
    });
});
exports.userController = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
