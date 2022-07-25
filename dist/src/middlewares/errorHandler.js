import { errorTypeToStatusCode, isAppError } from '../utils/errorUtils.js';
export default function errorHandler(error, req, res, next) {
    if (isAppError(error)) {
        var statusCode = errorTypeToStatusCode(error.type);
        console.log(error.message);
        return res.status(statusCode).send(error.message);
    }
    res.sendStatus(500);
}
