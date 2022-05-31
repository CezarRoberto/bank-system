import 'reflect-metadata';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/error/AppError';

@injectable()
class FindAllClientsUseCase {
    constructor(
        @inject('ClientRepository')
        private clientRepository: ClientRepository
    ) { }

    async execute() {
        const clients = await this.clientRepository.findAll()

        if(!clients) {
            throw new AppError('No Clients have been found', 404);
        }

        return clients
    }
}

export { FindAllClientsUseCase }