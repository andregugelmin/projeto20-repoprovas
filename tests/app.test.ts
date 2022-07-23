import supertest from 'supertest';

import app from '../src/app.js';
import { prisma } from '../src/config/database.js';
import testFactory from './factories/testFactory.js';
import userFactory from './factories/userFactory.js';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests`;
    await prisma.$executeRaw`DELETE FROM users WHERE email = 'andre@gmail.com'`;
});

describe('User tests suite', () => {
    it('given email and password, create user', async () => {
        const login = userFactory.createLogin();
        const response = await supertest(app).post(`/sign-up`).send(login);
        expect(response.status).toBe(201);

        const user = await prisma.user.findFirst({
            where: { email: login.email },
        });

        expect(user.email).toBe(login.email);
    });

    it('given an invalid input, returns 422', async () => {
        const login = userFactory.createLogin();
        delete login.password;

        const response = await supertest(app).post(`/sign-up`).send(login);
        expect(response.status).toBe(422);
    });

    it('given valid email and password, receive token', async () => {
        const login = userFactory.createLogin();
        const user: any = await userFactory.createUser(login);

        const response = await supertest(app).post(`/sign-in`).send({
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
            .post(`/sign-in`)
            .send({ ...login, password: '12345678' });
        expect(response.status).toBe(401);
    });

    it('given email and password already in use, fail to create user', async () => {
        const login = userFactory.createLogin();
        await userFactory.createUser(login);

        const response = await supertest(app).post(`/sign-up`).send(login);
        expect(response.statusCode).toBe(409);
    });
});

describe('Test tests suite', () => {
    it('create a test, receive 201', async () => {
        const login = userFactory.createLogin();
        await userFactory.createUser(login);

        let response = await supertest(app).post(`/sign-in`).send(login);
        const token = response.body.token;

        const test = testFactory.createTest();
        console.log(token);
        response = await supertest(app)
            .post('/test')
            .send(test)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);

        const savedTest = await prisma.test.findFirst({
            where: { name: test.name },
        });
        expect(savedTest).not.toBeNull();
    });
    it('create a test with a invalid token, receive 401', async () => {
        const login = userFactory.createLogin();
        await userFactory.createUser(login);

        let response = await supertest(app).post(`/sign-in`).send(login);
        const token = response.body.token;

        const test = testFactory.createTest();

        response = await supertest(app)
            .post('/test')
            .send(test)
            .set('Authorization', `Bearer 20198sadg7sd8ag2108`);
        expect(response.status).toBe(401);
    });

    it('create a test with a invalid name, receive 422', async () => {
        const login = userFactory.createLogin();
        await userFactory.createUser(login);

        let response = await supertest(app).post(`/sign-in`).send(login);
        const token = response.body.token;

        const test = testFactory.createTest();

        response = await supertest(app)
            .post('/test')
            .send({ ...test, name: '' })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(422);
    });
    it('create a test with a invalid url, receive 422', async () => {
        const login = userFactory.createLogin();
        await userFactory.createUser(login);

        let response = await supertest(app).post(`/sign-in`).send(login);
        const token = response.body.token;

        const test = testFactory.createTest();

        response = await supertest(app)
            .post('/test')
            .send({ ...test, pdfUrl: 'notaurl' })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(422);
    });
    it('create a test with a teacher that is not in database, receive 404', async () => {
        const login = userFactory.createLogin();
        await userFactory.createUser(login);

        let response = await supertest(app).post(`/sign-in`).send(login);
        const token = response.body.token;

        const test = testFactory.createTest();

        response = await supertest(app)
            .post('/test')
            .send({ ...test, teacher: 'invalidteacher' })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });
    it('create a test with a category that is not in database, receive 404', async () => {
        const login = userFactory.createLogin();
        await userFactory.createUser(login);

        let response = await supertest(app).post(`/sign-in`).send(login);
        const token = response.body.token;

        const test = testFactory.createTest();

        response = await supertest(app)
            .post('/test')
            .send({ ...test, category: 'invalidcategory' })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });
    it('create a test with a discipline that is not in database, receive 404', async () => {
        const login = userFactory.createLogin();
        await userFactory.createUser(login);

        let response = await supertest(app).post(`/sign-in`).send(login);
        const token = response.body.token;

        const test = testFactory.createTest();

        response = await supertest(app)
            .post('/test')
            .send({ ...test, discipline: 'invaliddiscipline' })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});
