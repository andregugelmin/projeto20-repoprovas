import teacherDisciplineRepository from '../repositories/teacherDisciplineRepository.js';

async function getTeacherDiscipline(teacherId: number, disciplineId: number) {
    let teacherDiscipline =
        await teacherDisciplineRepository.findTeacherDiscipline(
            teacherId,
            disciplineId
        );
    if (!teacherDiscipline)
        teacherDiscipline = await createAndFindTeacherDiscipline(
            teacherId,
            disciplineId
        );
    return teacherDiscipline;
}

async function createAndFindTeacherDiscipline(
    teacherId: number,
    disciplineId: number
) {
    await teacherDisciplineRepository.insert({ teacherId, disciplineId });
    return await teacherDisciplineRepository.findTeacherDiscipline(
        teacherId,
        disciplineId
    );
}

const teacherDisciplineService = { getTeacherDiscipline };

export default teacherDisciplineService;
