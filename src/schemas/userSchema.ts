import Joi from 'joi';
import { CreateUserData } from '../interfaces/createData.js';

type newUserData = CreateUserData & {
    confirmPassword: string;
};

export const createUserSchema = Joi.object<newUserData>({
    email: Joi.string().required(),
    password: Joi.string().min(10).required(),
    confirmPassword: Joi.valid(Joi.ref('password')).required(),
});
