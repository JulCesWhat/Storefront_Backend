import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const {
    TOKEN_SECRET
} = process.env;

const authentication = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authorizationHeader = req.headers.authorization || '';
        console.log(authorizationHeader);
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, TOKEN_SECRET as string);
        next();
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
}

export default authentication;