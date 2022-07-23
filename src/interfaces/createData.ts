import { Teacher, Test, User, Discipline, Category } from '@prisma/client';

export type CreateUserData = Omit<User, 'createdAt' | 'id'>;
export type CreateTestData = Omit<Test, 'createdAt' | 'id'>;
export type CreateTeacherData = Omit<Teacher, 'createdAt' | 'id'>;
export type CreateDisciplineData = Omit<Discipline, 'createdAt' | 'id'>;
export type CreateCategoryData = Omit<Category, 'createdAt' | 'id'>;
