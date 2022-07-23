import { prisma } from '../config/database.js';
import { CreateTeacherData } from '../interfaces/createData.js';

export async function findById(id: number) {
    return await prisma.teacher.findMany({
        where: {
            id: id,
        },
    });
}

export async function findByName(name: string) {
    const teacher = await prisma.teacher.findMany({
        where: {
            name: name,
        },
    });
    return teacher[0];
}

export default {
    findById,
    findByName,
};
