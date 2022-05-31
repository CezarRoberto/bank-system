import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { AppError } from '@shared/error/AppError';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindOneClientUseCase {
    constructor (
        @inject('ClientRepository')
        private clientRepository: ClientRepository
    ) {}

    async execute(id: string) {
        const clientDoesxists = await this.clientRepository.findById(id)

        if(!clientDoesxists) {
            throw new AppError('Client Doesnt Exists', 404);
        }

        const client = clientDoesxists

        return client
    }
}


export { FindOneClientUseCase }