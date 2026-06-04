import type { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../utils/sendResponse';
import { verifyToken } from '../utils/jwt';
import authService from '../api/services/auth.service';
import type { TRole } from '../types';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return sendResponse(
                res,
                { message: 'Access token is missing', error: true },
                401,
            );
        }

        const payload = verifyToken(token, 'access');
        if (!payload) {
            return sendResponse(
                res,
                { message: 'Invalid access token', error: true },
                401,
            );
        }

        const user = await authService.getUserById(payload.id);
        if (!user) {
            return sendResponse(
                res,
                { message: 'User not fount!', error: true },
                404,
            );
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

export const authorizeRoles = (...roles: TRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return sendResponse(
                    res,
                    { message: 'Unauthorized User!', error: true },
                    401,
                );
            }

            if (!roles.includes(req.user.role)) {
                return sendResponse(
                    res,
                    {
                        message: "Forbidden! - You don't have permission",
                        error: true,
                    },
                    403,
                );
            }

            return next();
        } catch (error) {
            next(error);
        }
    };
};
