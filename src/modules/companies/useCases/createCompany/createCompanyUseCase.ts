import { IClientRepository } from '@modules/clients/repositories/IClientRepository';
import { ICompanyRepository } from '@modules/companies/repositories/ICompaniesRepository';
import { Clients } from '@prisma/client';
import { AppError } from '@shared/error/AppError';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCompanyUseCase {
    constructor(
        @inject('CompanyRepository')
        private companiesRepository: ICompanyRepository,
        @inject('ClientRepository')
        private clientsRepository: IClientRepository
    ) { }

    async execute({ name, cnpj, code, clients }) {
        const companyAlreadyExistis = await this.companiesRepository.findByCNPJ(cnpj)

        if (companyAlreadyExistis) {
            throw new AppError('This Company Already Existis', 404);
        }

        if (clients.length === 0) {
            const company = await this.companiesRepository.createAdd({
                name,
                cnpj,
                code
            })

            return company;
        }

        const clientsEmail = clients.map(client => client.email)
        const clientsFound = await this.clientsRepository.findByEmail(clientsEmail) as unknown as Clients[]

        if (clientsFound.length === 0) {
            throw new AppError(`Clients not found`, 404);
        }

        const company = await this.companiesRepository.create({
            name,
            cnpj,
            code,
            clients: clientsFound
        })

        return company
    }
}

export {CreateCompanyUseCase}