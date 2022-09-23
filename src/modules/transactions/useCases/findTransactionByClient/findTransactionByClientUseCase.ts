import { TransactionRepository } from "@modules/transactions/repositories/implementation/TransactionRepository";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class FindTransactionByClientUseCase {
    constructor(
        @inject('TransactionRepository')
        private transactionRepository: TransactionRepository
    ) { }

    async execute(client_id: string) {
        const clientHaveTransactions = await this.transactionRepository.findByClient(client_id)

        if (!clientHaveTransactions) {
            throw new AppError('Client Doesnt Have Transactions', 404);
        }

        const transactions = clientHaveTransactions

        return transactions
    }
}

export { FindTransactionByClientUseCase }