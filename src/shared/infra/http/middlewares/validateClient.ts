import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

import { AppError } from '@shared/error/AppError';

export async function validateClient(
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        const body = await request.body;
        const schema = Yup.object().shape({
            name: Yup.string().required('Name is required'),
            cpf: Yup.string().required('Cpf is required'),
            email: Yup.string().required('Email is required').email(),
            password: Yup.string().required('Password is required').matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                `Your password should have at least 8 chars, one special char and one uppercase letter`,
            ),
            credits: Yup.string().required('Credits is required'),
            amount: Yup.number().required('Amount is required').positive().integer()
        })
        await schema.validate(body)
        next()
    } catch (error) {
        throw new AppError(error.message, 401)
    }
}