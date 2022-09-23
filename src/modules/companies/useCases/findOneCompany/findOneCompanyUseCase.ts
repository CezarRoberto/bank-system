import { ICompanyRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/error/AppError";
import { injectable, inject } from "tsyringe";

@injectable()
class findOneCompanyUseCase {
    constructor(
        @inject('CompanyRepository')
        private companiesRepository: ICompanyRepository,
    ) { }

    async execute(id: string) {
        const company = await this.companiesRepository.findById(id)

        if (!company) {
            throw new AppError('This Company Doesnt exists', 404);
        }

        return company
    }
}


export { findOneCompanyUseCase }