import bcrypt from 'bcrypt';
import { unauthorizedError } from './errorUtils';

export function encryptPassword(password: string) {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(password, SALT);
    return passwordHash;
}

export function verifyPassword(passwordLogin: string, passwordUser: string) {
    if (!bcrypt.compareSync(passwordLogin, passwordUser)) {
        throw unauthorizedError('Invalid password');
    }
}
