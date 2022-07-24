import { CreateTestData } from '../interfaces/createData.js';
import testRepository from '../repositories/testRepository.js';
import categoryService from '../services/categoryService.js';
import disciplineService from '../services/disciplineService.js';
import teacherService from '../services/teacherService.js';

import { notFoundError } from '../utils/errorUtils.js';
import teacherDisciplineService from './teacherDisciplneService.js';

async function createTest(
    name: string,
    pdfUrl: string,
    teacherName: string,
    categoryName: string,
    disciplineName: string
) {
    const data = await findCreateTestData(
        teacherName,
        categoryName,
        disciplineName
    );
    const createTestData: CreateTestData = { ...data, name, pdfUrl };
    await testRepository.insert(createTestData);
}

async function findCreateTestData(
    teacherName: string,
    categoryName: string,
    disciplineName: string
) {
    const teacher = await teacherService.getTeacherbyName(teacherName);

    const category = await categoryService.getCategorybyName(categoryName);

    const discipline = await disciplineService.getDisciplinebyName(
        disciplineName
    );

    const teacherDiscipline =
        await teacherDisciplineService.getTeacherDisciplineService(
            teacher.id,
            discipline.id
        );

    const data = {
        categoryId: category.id,
        teacherId: teacher.id,
        disciplineId: discipline.id,
    };
    return data;
}

export async function getTestByTerms() {
    const result = await testRepository.findByTerms();

    const terms = result.map((term) => {
        return {
            number: term.number,
            disciplines: term.Discipline.map((discipline) => {
                return separateTestsByCategory(discipline);
            }),
        };
    });
    return terms;
}

function separateTestsByCategory(discipline) {
    let categories = [];
    let categoriesObj = {};
    let categoriesArr = [];

    discipline.Test.forEach((test) => {
        if (!categories.includes(test.category.name))
            categories.push(test.category.name);
    });

    categories.forEach((category) => {
        const testFiltered = discipline.Test.filter((test) => {
            return test.category.name === category;
        });
        const testMaped = testFiltered.map((test) => {
            return {
                name: test.name,
                pdfUrl: test.pdfUrl,
                teacher: test.Teacher.name,
            };
        });

        categoriesObj = {
            name: category,
            tests: testMaped,
        };
        categoriesArr.push(categoriesObj);
    });

    if (categoriesArr.length === 0) {
        return {
            name: discipline.name,
            categories: 'Não tem prova pra nenhuma categoria nessa disciplina',
        };
    }
    return { name: discipline.name, categories: categoriesArr };
}

const testService = { createTest, getTestByTerms };

export default testService;
