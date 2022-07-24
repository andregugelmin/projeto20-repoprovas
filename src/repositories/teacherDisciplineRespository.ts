import { prisma } from '../config/database.js';

export async function findTeacherDisciplineId(
    teacherId: number,
    disciplineId: number
) {
    const teacherDiscipline = await prisma.teacherDiscipline.findMany({
        where: {
            teacherId,
            disciplineId,
        },
    });
    return teacherDiscipline[0];
}

export default {
    findTeacherDisciplineId,
};
