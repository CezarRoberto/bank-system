import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';


@injectable()
class FindAllClientsUseCase {
    constructor(
        @inject('ClientRepository')
        private clientRepository: ClientRepository
    ) { }

    async execute() {
        const clients = await this.clientRepository.findAll()

        return clients
    }
}

export { FindAllClientsUseCase }