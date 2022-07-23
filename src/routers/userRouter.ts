import { Router } from 'express';
import { login, singup } from '../controllers/userController.js';
import { checkEmailIsRegistered } from '../middlewares/authenticationMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { userSchema } from '../schemas/userSchema.js';

const userRouter = Router();

userRouter.post(
    '/sign-up',
    validateSchema(userSchema),
    checkEmailIsRegistered,
    singup
);
userRouter.post('/sign-in', login);

export default userRouter;
