import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

import { AppError } from '@shared/error/AppError';

export async function validateTransaction(
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        const body = await request.body;
        const schema = Yup.object().shape({
            client_id: Yup.string().required('Client ID is required'),
            type: Yup.string().required('Type is required'),
            amount: Yup.number().required('Amount is required').positive().integer(),
        })
        await schema.validate(body)
        next()
    } catch (error) {
        throw new AppError(error.message, 401)
    }
}