import { prisma } from '../config/database.js';

export async function findByName(name: string) {
    const discipline = await prisma.category.findMany({
        where: {
            name: name,
        },
    });
    return discipline[0];
}

export default {
    findByName,
};
