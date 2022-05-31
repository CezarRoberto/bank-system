import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

import { AppError } from '@shared/error/AppError';

export async function validateCompany(
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        const body = await request.body;
        const schema = Yup.object().shape({
            name: Yup.string().required('Name is required'),
            cnpj: Yup.string().required('CNPJ is required'),
            code: Yup.string().required('Credits is required'),
        })
        await schema.validate(body)
        next()
    } catch (error) {
        throw new AppError(error.message, 401)
    }
}