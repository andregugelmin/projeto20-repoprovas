import Joi from 'joi';
export var createUserSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(10).required(),
    confirmPassword: Joi.valid(Joi.ref('password')).required()
});
