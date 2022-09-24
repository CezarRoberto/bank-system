import { TransactionRepository } from '@modules/transactions/repositories/implementation/TransactionRepository';
import { DeleteTransactionUseCase } from '@modules/transactions/useCases/deleteTransaction/deleteTransactionUseCase';
import { TransactionType } from '@prisma/client';
import { mock, MockProxy } from 'jest-mock-extended';

describe('DeleteTransactionUseCase', () => {
    let transactionRepository: MockProxy<TransactionRepository>;
    let sut: DeleteTransactionUseCase;
    beforeEach(() => {
        transactionRepository = mock();
        transactionRepository.findById.mockResolvedValue({
            id: 'any_transaction',
            type: TransactionType.WITHDRAW,
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });

        transactionRepository.deleteTransaction.mockResolvedValue({
            id: 'any_transaction',
            type: TransactionType.WITHDRAW,
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });

        sut = new DeleteTransactionUseCase(transactionRepository);
    });
    it('should be able to create a transaction with WITHDRAW ', async () => {
        const request = await sut.execute('any_id');

        expect(request).toEqual({
            id: 'any_transaction',
            type: TransactionType.WITHDRAW,
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
    });

    it('should be able to throw an AppError when client dont exists ', async () => {
        transactionRepository.findById.mockResolvedValueOnce(null);
        const request = async () => {
            await sut.execute('any_id');
        };
        expect(request).rejects.toEqual({
            message: 'Transaction Doesnt Exists',
            statusCode: 404,
        });
    });
});
