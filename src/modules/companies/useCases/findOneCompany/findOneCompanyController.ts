import { Request, Response } from "express";
import { container } from "tsyringe";
import { findOneCompanyUseCase } from "./findOneCompanyUseCase";

class FindOneCompanyController {
    async handle(request: Request, response: Response) {
        const { id } = request.params
        const FindOneCompanyUseCase = container.resolve(findOneCompanyUseCase);

        const company = await FindOneCompanyUseCase.execute(id)

        return response.status(200).json(company)
    }
}

export { FindOneCompanyController }