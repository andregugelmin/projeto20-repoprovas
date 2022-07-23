import teacherRepository from '../repositories/teacherRepository.js';

import { notFoundError } from '../utils/errorUtils.js';

async function getTeacherbyName(name: string) {
    const teacher = await teacherRepository.findByName(name);
    if (!teacher) throw notFoundError('Teacher not found');
    return teacher;
}

const teacherService = { getTeacherbyName };

export default teacherService;
