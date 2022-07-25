import { Router } from 'express';
import testRouter from './testRouter.js';
import userRouter from './userRouter.js';
var router = Router();
router.use(userRouter);
router.use(testRouter);
export default router;
