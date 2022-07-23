import { Request, Response } from 'express';
import testService from '../services/testService.js';

export async function createTest(req: Request, res: Response) {
    const { name, pdfUrl, teacher, category, discipline } = req.body;

    await testService.createTest(name, pdfUrl, teacher, category, discipline);
    return res.sendStatus(201);
}
