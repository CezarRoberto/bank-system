import { ClientRepository } from "@modules/clients/repositories/implementations/ClientRepository";
import { TransactionRepository } from "@modules/transactions/repository/implementation/TransactionRepository";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateTransactionUseCase {
    constructor(
        @inject('TransactionRepository')
        private transactionRepository: TransactionRepository,

        @inject('ClientRepository')
        private clientRepository: ClientRepository
    ) { }

    async execute({client_id, amount, type }) {
        const clientDoesExists = await this.clientRepository.findById(client_id)

        if (!clientDoesExists) {
            throw new AppError('Client Doesnt Exists', 404);
        }

        const transaction = await this.transactionRepository.create({
            client_id,
            amount,
            type
        })

        return transaction
    }
}

export { CreateTransactionUseCase }