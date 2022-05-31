import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { AppError } from '@shared/error/AppError';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';


@injectable()
class FindAllClientsByBankUseCase {
    constructor (
        @inject('ClientRepository')
        private clientRepository: ClientRepository
    ) {}

    async execute(company_id: string) {
        const clientsDoesntExists = await this.clientRepository.findAllByBank(company_id)

        if(!clientsDoesntExists) {
            throw new AppError('Clients Doesnt Registred', 404);
        }

        const clients = clientsDoesntExists

        return clients
    }
}


export {FindAllClientsByBankUseCase}