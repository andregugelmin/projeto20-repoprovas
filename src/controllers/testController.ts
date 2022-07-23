import { Request, Response } from 'express';
import testService from '../services/testService.js';

export async function createTest(req: Request, res: Response) {
    const { name, url, teacher, category, discipline } = req.body;

    await testService.createTest(name, url, teacher, category, discipline);
    return res.sendStatus(201);
}
