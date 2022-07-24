import { Request, Response } from 'express';
import testService from '../services/testService.js';

export async function createTest(req: Request, res: Response) {
    const { name, pdfUrl, teacher, category, discipline } = req.body;

    await testService.createTest(name, pdfUrl, teacher, category, discipline);

    return res.sendStatus(201);
}

export async function getTestByTerms(req: Request, res: Response) {
    const result = await testService.getTestByTerms();

    return res.send({ terms: result }).status(200);
}

export async function getTestByTeachers(req: Request, res: Response) {
    const result = await testService.getTestByTeachers();

    return res.send({ terms: result }).status(200);
}
