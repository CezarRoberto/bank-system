import 'reflect-metadata';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { AppError } from '@shared/error/AppError';
import bcrypt from 'bcryptjs';

import { inject, injectable } from 'tsyringe';

@injectable()
class CreateClientUseCase {
    constructor(
        @inject('ClientRepository')
        private readonly clientRepository: ClientRepository
    ) { }

    async execute({ name, cpf, email, password, company_id, credits, amount }) {
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
            company_id,
            credits,
            amount
        })

        return client

    }
}

export { CreateClientUseCase }