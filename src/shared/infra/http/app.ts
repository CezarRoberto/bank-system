import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import 'express-async-errors';
import helmet from 'helmet';
import express, { Application, NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/error/AppError';
import { router } from './routes';
import '../../container';
import swaggerUi from 'swagger-ui-express';


import swaggerFile from '../../../../docs/swagger.json'
const app: Application = express();

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
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