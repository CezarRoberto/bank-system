import { TransactionRepository } from "@modules/transactions/repository/implementation/TransactionRepository";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteTransactionUseCase {
    constructor(
        @inject('TransactionRepository')
        private transactionRepository: TransactionRepository
        ) {}

        async execute(id: string) {
            const transactionDoesntExists = await this.transactionRepository.deleteTransaction(id)

            if(!transactionDoesntExists) {
                throw new AppError('Transaction Doesnt Exists', 404);
            }


            const transaction = transactionDoesntExists 
            return transaction
        }
}

export {DeleteTransactionUseCase}