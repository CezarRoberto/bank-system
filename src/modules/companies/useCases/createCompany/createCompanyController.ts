import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCompanyUseCase } from './createCompanyUseCase';


class CreateCompanyController {
    async handle(request: Request, response: Response) {
        const {name, cnpj, code, clients} = request.body;
        const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

        const company = await createCompanyUseCase.execute({
            name,
            cnpj,
            code,
            clients
        })

        return response.status(200).json(company)
    }
}

export {CreateCompanyController}