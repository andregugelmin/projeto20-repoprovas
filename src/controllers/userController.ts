import { Request, Response } from 'express';
import userService from '../services/userService.js';

export async function singup(req: Request, res: Response) {
    const user = req.body;
    await userService.createUser(user);
    return res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
    const user = req.body;
    const token = await userService.login(user);

    return res.send({ token }).status(200);
}
