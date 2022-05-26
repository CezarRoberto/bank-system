import { ICompanyRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllCompaniesUseCase {
    constructor (
        @inject('CompanyRepository')
        private companiesRepository: ICompanyRepository,
    ) {}

    async execute() {
        const companies = await this.companiesRepository.findAll()

        if(!companies) {
            throw new AppError('No Companies have been found', 404);
        }

        return companies
    }
}


export {FindAllCompaniesUseCase}