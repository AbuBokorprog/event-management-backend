"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../errors/AppError");
const getAllUsers = async () => {
    return user_model_1.User.find({}, { password: 0 });
};
const getSingleUser = async (id) => {
    const user = await user_model_1.User.findById(id).select('-password');
    if (!user)
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    return user;
};
const deleteUser = async (id) => {
    return user_model_1.User.findByIdAndDelete(id);
};
const updateUser = async (id, payload) => {
    const user = await user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).select('-password');
    if (!user)
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    return user;
};
exports.userService = {
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
};
