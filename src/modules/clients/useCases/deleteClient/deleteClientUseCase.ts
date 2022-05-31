import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { AppError } from '@shared/error/AppError';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteClientUseCase {
    constructor (
        @inject('ClientRepository')
        private clientRepository: ClientRepository
    ) {}

    async execute(id: string) {
        const clientDoesntExists = await this.clientRepository.deleteById(id)

        if(!clientDoesntExists) {
            throw new AppError('Client Doesnt Exists', 404);
        }

        const client = clientDoesntExists

        return client
    }
}

export {DeleteClientUseCase}