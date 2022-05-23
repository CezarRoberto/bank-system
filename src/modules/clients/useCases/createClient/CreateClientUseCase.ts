import 'reflect-metadata';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { CompanyRepository } from '@modules/companies/repositories/implementation/CompaniesRepository';
import { AppError } from '@shared/error/AppError';
import bcrypt from 'bcryptjs';

import { inject, injectable } from 'tsyringe';

@injectable()
class CreateClientUseCase {
    constructor(
        @inject('ClientRepository')
        private clientRepository: ClientRepository
    ) {}

    async execute({name, cpf, email, password, company_id}) {
        const clientAlreadyExists = await this.clientRepository.findByEmail(email)

        if (clientAlreadyExists) {
            throw new AppError('Client Already Exists', 404);
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        const client = await this.clientRepository.create({
            name,
            cpf,
            email,
            password: passwordHashed,
            company_id
        })

        return client

    }
}

export {CreateClientUseCase}