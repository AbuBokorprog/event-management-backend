"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = require("../../errors/AppError");
const user_model_1 = require("../user/user.model");
const register = async (payload) => {
    const { email } = payload;
    const existingUser = await user_model_1.User.findOne({ email });
    if (existingUser) {
        throw new AppError_1.AppError(http_status_1.default.CONFLICT, 'User already exists');
    }
    const hashedPassword = await bcrypt_1.default.hash(payload.password, 10);
    const user = await user_model_1.User.create({
        ...payload,
        password: hashedPassword,
    });
    // Return without password
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
};
const login = async (email, password) => {
    const user = await user_model_1.User.findOne({ email }).select({
        password: 1,
        name: 1,
        email: 1,
        photoUrl: 1,
    });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Invalid credentials');
    }
    const access_token = jsonwebtoken_1.default.sign({
        id: user?._id,
        email: user?.email,
        name: user?.name,
        photoURL: user?.photoURL,
    }, config_1.default.jwt_access_secret, { expiresIn: config_1.default.jwt_access_expires_in });
    const refresh_token = jsonwebtoken_1.default.sign({
        id: user?._id,
        email: user?.email,
        name: user?.name,
        photoURL: user?.photoURL,
    }, config_1.default.jwt_refresh_secret, { expiresIn: config_1.default.jwt_refresh_expires_in });
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
const forgetPassword = async (email) => {
    const user = await user_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const resetToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.default.jwt_access_secret, { expiresIn: '15m' });
    // Send resetToken via email in a real app
    return { resetToken, message: 'Token generated (mock)' };
};
const resetPassword = async (token, newPassword) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const hashed = await bcrypt_1.default.hash(newPassword, 10);
        await user_model_1.User.findByIdAndUpdate(decoded.id, { password: hashed });
    }
    catch {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Invalid or expired token');
    }
};
const changePassword = async (userId, oldPassword, newPassword) => {
    const user = await user_model_1.User.findById(userId).select('+password');
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isMatch = await bcrypt_1.default.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Old password is incorrect');
    }
    const newHashedPassword = await bcrypt_1.default.hash(newPassword, 10);
    user.password = newHashedPassword;
    await user.save();
};
exports.authService = {
    register,
    login,
    forgetPassword,
    resetPassword,
    changePassword,
};
