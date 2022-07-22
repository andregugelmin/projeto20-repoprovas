import { Request, Response, NextFunction } from 'express';
import { errorTypeToStatusCode, isAppError } from '../utils/errorUtils.js';

export default function errorHandler(
    error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (isAppError(error)) {
        const statusCode = errorTypeToStatusCode(error.type);
        return res.status(statusCode).send(error.message);
    }

    res.sendStatus(500);
}
