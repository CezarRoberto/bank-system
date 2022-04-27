import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import 'express-async-errors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/error/AppError';

const app: Application = express();

app.use(cors)
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
        });
    }

    return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`,
    });
});

export {app}