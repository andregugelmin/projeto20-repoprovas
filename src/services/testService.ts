import { CreateTestData } from '../interfaces/createData.js';
import testRepository from '../repositories/testRepository.js';
import categoryService from '../services/categoryService';
import disciplineService from '../services/disciplineService';
import teacherService from '../services/teacherService';

import { notFoundError } from '../utils/errorUtils.js';

async function createTest(
    name: string,
    url: string,
    teacherName: string,
    categoryName: string,
    disciplineName: string
) {
    const teacher = await teacherService.getTeacherbyName(teacherName);
    if (!teacher) throw notFoundError('Teacher not found');

    const category = await categoryService.getCategorybyName(categoryName);
    if (!category) throw notFoundError('Category not found');

    const discipline = await disciplineService.getDisciplinebyName(
        disciplineName
    );
    if (!discipline) throw notFoundError('Discipline not found');

    const createTestData: CreateTestData = {
        name,
        url,
        categoryId: category.id,
        teacherId: teacher.id,
        disciplineId: discipline.id,
    };
    await testRepository.insert(createTestData);
}

const testService = { createTest };

export default testService;
