
import 'reflect-metadata';
import { ICompanyRepository } from '@modules/companies/repositories/ICompaniesRepository';
import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCompanyUseCase {
    constructor(
        @inject('CompanyRepository')
        private companiesRepository: ICompanyRepository,
    ) { }

    async execute({ name, cnpj, code }) {
        const companyAlreadyExistis = await this.companiesRepository.findByCNPJ(cnpj)

        if (companyAlreadyExistis) {
            throw new AppError('This Company Already Existis', 404);
        }

        const company = await this.companiesRepository.create({
            name,
            cnpj,
            code
        })

        return company
    }
}

export { CreateCompanyUseCase }