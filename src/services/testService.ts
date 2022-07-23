import { CreateTestData } from '../interfaces/createData.js';
import testRepository from '../repositories/testRepository.js';
import categoryService from '../services/categoryService.js';
import disciplineService from '../services/disciplineService.js';
import teacherService from '../services/teacherService.js';

import { notFoundError } from '../utils/errorUtils.js';
import teacherDisciplineService from './teacherDisciplineService.js';

async function createTest(
    name: string,
    pdfUrl: string,
    teacherName: string,
    categoryName: string,
    disciplineName: string
) {
    const teacher = await teacherService.getTeacherbyName(teacherName);
    if (!teacher) throw notFoundError('Teacher not found');
    console.log(teacher);
    const category = await categoryService.getCategorybyName(categoryName);
    if (!category) throw notFoundError('Category not found');
    console.log(category);

    const discipline = await disciplineService.getDisciplinebyName(
        disciplineName
    );
    if (!discipline) throw notFoundError('Discipline not found');
    console.log(discipline);

    const teacherDiscipline =
        await teacherDisciplineService.getTeacherDiscipline(
            teacher.id,
            discipline.id
        );
    console.log(teacherDiscipline);
    const createTestData: CreateTestData = {
        name,
        pdfUrl,
        categoryId: category.id,
        teacherDisciplineId: teacherDiscipline.id,
    };
    await testRepository.insert(createTestData);
}

const testService = { createTest };

export default testService;
