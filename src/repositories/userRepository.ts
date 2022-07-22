import { prisma } from '../config/database.js';
import { CreateUserData } from '../interfaces/createData.js';

export async function insert(createUserData: CreateUserData) {
    await prisma.user.create({
        data: createUserData,
    });
}

export async function findById(id: number) {
    return await prisma.user.findMany({
        where: {
            id: id,
        },
    });
}

export async function findByEmail(email: string) {
    const user = await prisma.user.findMany({
        where: {
            email: email,
        },
    });
    return user[0];
}

export default {
    insert,
    findById,
    findByEmail,
};
