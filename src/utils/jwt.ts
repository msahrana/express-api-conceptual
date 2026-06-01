import config from '../config';
import type { OUser } from '../types';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export const verifyToken = (token: string, type: 'access' | 'refresh') => {
    const secret = type === 'refresh' ? config.refresh_token : config.jwt_token;
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
};

export const signToken = (payload: OUser) => {
    const accessToken = jwt.sign(payload, config.jwt_token, {
        expiresIn: '7d',
    });

    const refreshToken = jwt.sign(payload, config.refresh_token, {
        expiresIn: '365d',
    });

    return { accessToken, refreshToken };
};
