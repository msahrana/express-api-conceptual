import type { Request, Response } from 'express';
import authService from '../services/auth.service';
import { sendResponse } from '../../utils/sendResponse';
import { signToken, verifyToken } from '../../utils/jwt';

// Signup Single User
export const signup = async (req: Request, res: Response) => {
    const user = await authService.createUserIntoDB(req.body);
    if (!user) {
        return sendResponse(
            res,
            { message: 'Failed to create user', error: true },
            400,
        );
    }

    return sendResponse(
        res,
        { message: 'User signup successfully', data: user },
        201,
    );
};

// Login Single User
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await authService.loginUserIntoDB(email, password);
    if (!user) {
        return sendResponse(res, { message: 'Invalid email or password' }, 401);
    }

    const { accessToken, refreshToken } = signToken(user);

    res.cookie('refreshToken', refreshToken, {
        sameSite: 'lax',
        secure: false,
        httpOnly: true,
    });

    const result = { user: user, accessToken, refreshToken };

    return sendResponse(
        res,
        { message: 'User login successfully', data: result },
        201,
    );
};

// Create Refresh Token
export const refresh = async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return sendResponse(res, { message: 'Refresh token not fount!' }, 404);
    }

    const payload = verifyToken(refreshToken, 'refresh');
    if (!payload) {
        return sendResponse(res, { message: 'Verify token not fount!' }, 404);
    }

    const user = await authService.getUserById(payload.id);
    if (!user) {
        return sendResponse(res, { message: 'User not fount!' }, 404);
    }

    const { accessToken, refreshToken: newRefreshToken } = signToken(user);

    res.cookie('refreshToken', newRefreshToken, {
        sameSite: 'lax',
        secure: false,
        httpOnly: true,
    });

    sendResponse(res, {
        message: 'Token refreshed successfully',
        data: { accessToken, newRefreshToken },
    });
};

// Get Current User
export const getCurrentUser = async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
        return sendResponse(
            res,
            { message: 'Unauthorized user', error: true },
            401,
        );
    }

    const userId = verifyToken(accessToken, 'access')?.id;
    const user = await authService.getUserById(userId);
    if (!user) {
        return sendResponse(
            res,
            { message: 'User not found!', error: true },
            404,
        );
    }

    sendResponse(
        res,
        { message: 'User fetched successfully', data: user },
        200,
    );
};

// Update Single User
export const updateUser = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    console.log(userId);
    if (!userId) {
        return sendResponse(res, { message: 'Unauthorized', error: true }, 401);
    }

    const { name, email, age, password } = req.body;

    const updated = await authService.updateUser(userId, {
        name,
        email,
        age,
        password,
    });
    if (!updated) {
        return sendResponse(
            res,
            { message: 'Failed to update user', error: true },
            400,
        );
    }

    sendResponse(
        res,
        { message: 'User updated successfully', data: updated },
        200,
    );
};

// Delete Single User
export const deleteUser = async (req: Request, res: Response) => {
    const id = req.user?.id;
    if (!id) {
        return sendResponse(res, { message: 'Unauthorized', error: true }, 401);
    }

    const deleted = await authService.deleteAccount(id);
    if (!deleted) {
        return sendResponse(
            res,
            { message: 'Failed to delete account', error: true },
            400,
        );
    }

    res.clearCookie('refreshToken', {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
    });

    sendResponse(res, { message: 'One Account deleted successfully' }, 200);
};

// Logout Single User
export const logout = (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return sendResponse(
            res,
            { message: 'No active session found', error: true },
            400,
        );
    }

    res.clearCookie('refreshToken', {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
    });

    sendResponse(res, { message: 'Logged out successfully' }, 200);
};

// Get All Users
export const getAllUser = async (req: Request, res: Response) => {
    const allUsers = await authService.getAllUsers();

    return sendResponse(res, {
        message: 'All Users retrieved successfully',
        data: allUsers,
    });
};

// Delete All Users
export const deleteAllUser = async (req: Request, res: Response) => {
    const deleteResult = await authService.deleteAllUsers();

    if (deleteResult.length === 0) {
        return sendResponse(res, {
            message: 'No User found yet here...!!!',
        });
    }

    sendResponse(res, {
        message: 'All Users deleted successfully!!!',
    });
    return deleteResult;
};
