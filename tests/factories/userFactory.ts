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
    const user = await prisma.user.create({
        data: {
            email: login.email,
            password: bcrypt.hashSync(login.password, 12),
        },
    });

    return { ...user, plainPassword: login.password };
}

async function loginAndReceiveToken() {
    const login = createLogin();
    await createUser(login);

    let response = await supertest(app).post(`/sign-in`).send(login);
    const token = response.body.token;
    return token;
}

const userFactory = {
    createLogin,
    createUser,
    loginAndReceiveToken,
};

export default userFactory;
