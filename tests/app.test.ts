import supertest from 'supertest';

import app from '../src/app.js';
import { prisma } from '../src/config/database.js';
import userFactory from './factories/userFactory.js';

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = 'andre@gmail.com'`;
});

describe('User tests suite', () => {
    it('given email and password, create user', async () => {
        const login = userFactory.createLogin();
        const response = await supertest(app).post(`/signup`).send(login);
        expect(response.status).toBe(201);

        const user = await prisma.user.findFirst({
            where: { email: login.email },
        });

        expect(user.email).toBe(login.email);
    });

    it('given an invalid input, returns 422', async () => {
        const login = userFactory.createLogin();
        delete login.password;

        const response = await supertest(app).post(`/signup`).send(login);
        expect(response.status).toBe(422);
    });

    it('given valid email and password, receive token', async () => {
        const login = userFactory.createLogin();
        const user: any = await userFactory.createUser(login);

        const response = await supertest(app).post(`/signin`).send({
            email: user.email,
            password: user.plainPassword,
        });
        const token = response.body.token;
        expect(token).not.toBeNull();
    });

    it('given invalid password, receive 401', async () => {
        const login = userFactory.createLogin();
        const user = userFactory.createUser(login);

        const response = await supertest(app)
            .post(`/signin`)
            .send({ ...login, password: '12345678' });
        expect(response.status).toBe(401);
    });

    it('given email and password already in use, fail to create user', async () => {
        const login = userFactory.createLogin();
        await userFactory.createUser(login);

        const response = await supertest(app).post(`/signup`).send(login);
        expect(response.statusCode).toBe(409);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});
