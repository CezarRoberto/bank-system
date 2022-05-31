import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindAllCompaniesUseCase } from './findAllCompanyUseCase';

class FindAllCompaniesController  {
    async handle(request: Request, response: Response) {
        const findAllCompaniesUseCase = container.resolve(FindAllCompaniesUseCase);

        const companies = await findAllCompaniesUseCase.execute()
        return response.status(200).json(companies)
    }
}

export {FindAllCompaniesController}