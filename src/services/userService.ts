import jwt from 'jsonwebtoken';

import { CreateUserData } from '../interfaces/createData.js';
import userRepository from '../repositories/userRepository.js';
import { encryptPassword, verifyPassword } from '../utils/encryptUtils.js';
import { notFoundError, unauthorizedError } from '../utils/errorUtils.js';

async function findUserById(id: number) {
    const user = await userRepository.findById(id);
    if (!user) throw notFoundError('User not found');
    return user[0];
}

async function findUserByEmail(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw notFoundError('User not found');
    return user;
}

async function createUser(user: CreateUserData) {
    const passwordEncrypted = encryptPassword(user.password);

    await userRepository.insert({ ...user, password: passwordEncrypted });
}

async function login(user: CreateUserData) {
    const userDb = await getUserOrFail(user);

    verifyPassword(user.password, userDb.password);

    const token = jwt.sign(
        { email: userDb.email, id: userDb.id },
        process.env.JWT_SECRET
    );

    return token;
}

async function getUserOrFail(login: CreateUserData) {
    const user = await userRepository.findByEmail(login.email);
    if (!user) throw unauthorizedError('Invalid credentials');

    verifyPassword(login.password, user.password);

    return user;
}

const userService = { findUserById, findUserByEmail, createUser, login };

export default userService;
