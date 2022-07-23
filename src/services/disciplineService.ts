import disciplineRepository from '../repositories/disciplineRepository.js';

import { notFoundError } from '../utils/errorUtils.js';

async function getDisciplinebyName(name: string) {
    const discipline = await disciplineRepository.findByName(name);
    if (!discipline) throw notFoundError('Teacher not found');
    return discipline;
}

const disciplineService = { getDisciplinebyName };

export default disciplineService;
