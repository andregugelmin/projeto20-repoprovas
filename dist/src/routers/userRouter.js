import { Router } from 'express';
import { login, singup } from '../controllers/userController.js';
import { checkEmailIsRegistered } from '../middlewares/authenticationMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { createUserSchema } from '../schemas/userSchema.js';
var userRouter = Router();
userRouter.post('/sign-up', validateSchema(createUserSchema), checkEmailIsRegistered, singup);
userRouter.post('/sign-in', login);
export default userRouter;
