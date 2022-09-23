import 'reflect-metadata';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCompanyUseCase } from './createCompanyUseCase';


class CreateCompanyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {name, cnpj, code} = request.body;
        const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

        const company = await createCompanyUseCase.execute({
            name,
            cnpj,
            code,
        })

        return response.status(200).json(company)
    }
}

export {CreateCompanyController}

