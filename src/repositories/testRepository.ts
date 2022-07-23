import { prisma } from '../config/database.js';
import { CreateTestData } from '../interfaces/createData.js';

export async function insert(createTestData: CreateTestData) {
    await prisma.test.create({
        data: createTestData,
    });
}

export async function findById(id: number) {
    return await prisma.test.findMany({
        where: {
            id: id,
        },
    });
}

export async function findByName(name: string) {
    const test = await prisma.test.findMany({
        where: {
            name: name,
        },
    });
    return test[0];
}

export default {
    insert,
    findById,
    findByName,
};
