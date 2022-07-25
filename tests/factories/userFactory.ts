import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import supertest from 'supertest';

import app from '../../src/app.js';
import { prisma } from '../../src/config/database.js';

function createLogin(email = 'andre@gmail.com', passwordLength = 10) {
    const password = faker.internet.password(passwordLength);
    return {
        email,
        password: password,
        confirmPassword: password,
    };
}

interface Login {
    email: string;
    password: string;
}

async function createUser(login: Login) {
    const passwordEncrypted = bcrypt.hashSync(login.password, 12);
    const user = await prisma.user.create({
        data: {
            email: login.email,
            password: passwordEncrypted,
        },
    });

    return { ...user, password: login.password };
}

async function loginAndReceiveToken() {
    const login = createLogin();
    const user = await createUser(login);

    let response = await supertest(app).post(`/sign-in`).send(user);
    const token = response.body.token;
    return token;
}

const userFactory = {
    createLogin,
    createUser,
    loginAndReceiveToken,
};

export default userFactory;
