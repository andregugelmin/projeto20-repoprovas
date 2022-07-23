import { prisma } from '../config/database.js';

export async function findByName(name: string) {
    const category = await prisma.category.findMany({
        where: {
            name: name,
        },
    });
    return category[0];
}

export default {
    findByName,
};
