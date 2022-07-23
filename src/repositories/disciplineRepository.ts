import { prisma } from '../config/database.js';

export async function findById(id: number) {
    return await prisma.discipline.findMany({
        where: {
            id: id,
        },
    });
}

export async function findByName(name: string) {
    const discipline = await prisma.discipline.findMany({
        where: {
            name: name,
        },
    });
    return discipline[0];
}

export default {
    findById,
    findByName,
};
