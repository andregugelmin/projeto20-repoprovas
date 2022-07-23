import categoryRepository from '../repositories/categoryRepository.js';

import { notFoundError } from '../utils/errorUtils.js';

async function getCategorybyName(name: string) {
    const category = await categoryRepository.findByName(name);
    if (!category) throw notFoundError('Category not found');
    return category;
}

const categoryService = { getCategorybyName };

export default categoryService;
