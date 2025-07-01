"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = require("../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../modules/user/user.model");
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)(async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        // checking if the token is missing
        if (!token) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
        }
        // checking if the given token is valid
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { id } = decoded;
        // checking if the user is exist
        const user = await user_model_1.User.findById(id);
        if (!user) {
            throw new AppError_1.AppError(404, 'This user is not found !');
        }
        // if (requiredRoles && !requiredRoles.includes(role)) {
        //   throw new AppError(400, 'You are not authorized  hi!');
        // }
        req.user = decoded;
        next();
    });
};
exports.default = auth;
