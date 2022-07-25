import bcrypt from 'bcrypt';
import { unauthorizedError } from './errorUtils.js';
export function encryptPassword(password) {
    var SALT = 10;
    var passwordHash = bcrypt.hashSync(password, SALT);
    return passwordHash;
}
export function verifyPassword(passwordLogin, passwordUser) {
    if (!bcrypt.compareSync(passwordLogin, passwordUser)) {
        throw unauthorizedError('Invalid password');
    }
}
