import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

import { prisma } from '../../src/config/database.js';

function createTest() {
    return {
        name: faker.internet.domainWord(),
        pdfUrl: faker.internet.url(),
        category: 'Projeto',
        discipline: 'JavaScript',
        teacher: 'Diego Pinho',
    };
}

const testFactory = {
    createTest,
};

export default testFactory;
