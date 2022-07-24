import { Router } from 'express';
import {
    createTest,
    getTestByTeachers,
    getTestByTerms,
} from '../controllers/testController.js';
import { validateToken } from '../middlewares/authenticationMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { testSchema } from '../schemas/testSchema.js';

const testRouter = Router();

testRouter.post('/test', validateToken, validateSchema(testSchema), createTest);
testRouter.get('/tests/disciplines', validateToken, getTestByTerms);
testRouter.get('/tests/teachers', validateToken, getTestByTeachers);

export default testRouter;
