import { Router } from 'express';
import { createTest, getTestByTerms } from '../controllers/testController.js';
import { validateToken } from '../middlewares/authenticationMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { testSchema } from '../schemas/testSchema.js';

const testRouter = Router();

testRouter.post('/test', validateToken, validateSchema(testSchema), createTest);
testRouter.get('/tests/terms', getTestByTerms);

export default testRouter;
