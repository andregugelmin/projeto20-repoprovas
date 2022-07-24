import teacherDisciplineRespository from '../repositories/teacherDisciplineRespository.js';
import { notFoundError } from '../utils/errorUtils.js';

async function getTeacherDisciplineService(
    teacherId: number,
    disciplineId: number
) {
    const teacherDiscipline =
        await teacherDisciplineRespository.findTeacherDisciplineId(
            teacherId,
            disciplineId
        );
    if (!teacherDiscipline)
        throw notFoundError('Teacher and Discipline not correlated');

    return teacherDiscipline;
}

const teacherDisciplineService = { getTeacherDisciplineService };

export default teacherDisciplineService;
