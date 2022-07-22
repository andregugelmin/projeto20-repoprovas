import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findByEmail } from '../repositories/userRepository.js';
import { conflictError, unauthorizedError } from '../utils/errorUtils.js';

export function validateToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        throw unauthorizedError('invalid access token');
    }

    const userDecoded = jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) {
                throw unauthorizedError('invalid access token');
            }
            return decoded;
        }
    );

    res.locals.user = userDecoded;

    next();
}

export async function checkEmailIsRegistered(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { email } = req.body;
    const user = await findByEmail(email);
    if (user) {
        throw conflictError('Email is already registered');
    }

    next();
}
