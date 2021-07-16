import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const {
    TOKEN_SECRET
} = process.env

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
}

const show = async (req: Request, res: Response) => {
    const user = await store.show(req.body.id);
    res.json(user);
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };

        const newUser = await store.create(user);
        const token = jwt.sign({ firstname: newUser.firstname, lastname: newUser.lastname }, TOKEN_SECRET as string)
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const user = await store.authenticate(req.body.username, req.body.password)
        var token = jwt.sign({ firstname: user.firstname, lastname: user.lastname }, TOKEN_SECRET as string);
        res.json(token)
    } catch (error) {
        res.status(401)
        res.json({ error })
    }
}


const userRoutes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.delete('/users', destroy);
    app.post('/authenticate', authenticate);
}

export default userRoutes;