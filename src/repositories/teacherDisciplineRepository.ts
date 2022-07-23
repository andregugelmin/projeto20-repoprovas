import { prisma } from '../config/database.js';
import { CreateTeacherDisciplineData } from '../interfaces/createData.js';

export async function insert(
    createTeacherDisciplineData: CreateTeacherDisciplineData
) {
    await prisma.teacherDiscipline.create({
        data: createTeacherDisciplineData,
    });
}

export async function findTeacherDiscipline(
    teacherId: number,
    disciplineId: number
) {
    const teacherDiscipline = await prisma.teacherDiscipline.findMany({
        where: {
            teacherId: teacherId,
            disciplineId: disciplineId,
        },
    });
    return teacherDiscipline[0];
}

export default {
    insert,
    findTeacherDiscipline,
};
