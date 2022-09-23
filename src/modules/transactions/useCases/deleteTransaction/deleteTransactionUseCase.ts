import { TransactionRepository } from '@modules/transactions/repositories/implementation/TransactionRepository';
import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteTransactionUseCase {
    constructor(
        @inject('TransactionRepository')
        private transactionRepository: TransactionRepository,
    ) {}

    async execute(id: string) {
        const transactionDoesntExists =
            await this.transactionRepository.findById(id);

        if (!transactionDoesntExists) {
            throw new AppError('Transaction Doesnt Exists', 404);
        }

        const transaction = await this.transactionRepository.deleteTransaction(
            transactionDoesntExists.id,
        );
        return transaction;
    }
}

export { DeleteTransactionUseCase };
