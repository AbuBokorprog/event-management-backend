/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../modules/user/user.model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const auth = (...requiredRoles: string[]) => {
  return catchAsync(
    async (
      req: Request & { user?: any },
      res: Response,
      next: NextFunction,
    ) => {
      const token = req.headers.authorization?.split(' ')[1];

      // checking if the token is missing
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      // checking if the given token is valid
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { id } = decoded;

      // checking if the user is exist
      const user = await User.findById(id);

      if (!user) {
        throw new AppError(404, 'This user is not found !');
      }

      // if (requiredRoles && !requiredRoles.includes(role)) {
      //   throw new AppError(400, 'You are not authorized  hi!');
      // }

      req.user = decoded as JwtPayload;
      next();
    },
  );
};

export default auth;
