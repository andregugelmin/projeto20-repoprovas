import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

import { prisma } from '../../src/config/database.js';

function createTest() {
    return {
        name: faker.internet.domainWord(),
        url: faker.internet.url(),
        category: 'P1',
        discipline: 'Matematica I',
        teacher: 'Pedro',
    };
}

const testFactory = {
    createTest,
};

export default testFactory;
