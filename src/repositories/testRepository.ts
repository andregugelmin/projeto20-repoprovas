import { prisma } from '../config/database.js';
import { CreateTestData } from '../interfaces/createData.js';

export async function insert(createTestData: CreateTestData) {
    try {
        await prisma.test.create({
            data: createTestData,
        });
    } catch (error) {
        console.log(error);
    }
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

export async function findByTerms() {
    const terms = await prisma.term.findMany({
        select: {
            number: true,
            Discipline: {
                select: {
                    name: true,
                    Test: {
                        select: {
                            name: true,
                            pdfUrl: true,
                            category: {
                                select: { name: true },
                            },
                            Teacher: {
                                select: { name: true },
                            },
                        },
                    },
                },
            },
        },
    });
    return terms;
}

export async function findByCategory() {
    const terms = await prisma.category.findMany({
        select: {
            name: true,
            Test: {
                select: {
                    name: true,
                    pdfUrl: true,
                    teacherDiscipline: {
                        select: {
                            teacher: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    return terms;
}

export default {
    insert,
    findById,
    findByName,
    findByTerms,
    findByCategory,
};
