import { TransactionRepository } from '@modules/transactions/repositories/implementation/TransactionRepository';
import { FindTransactionByClientUseCase } from '@modules/transactions/useCases/findTransactionByClient/findTransactionByClientUseCase';
import { TransactionType } from '@prisma/client';
import { mock, MockProxy } from 'jest-mock-extended';

describe('FindTransactionByClientUseCase', () => {
    let transactionRepository: MockProxy<TransactionRepository>;
    let sut: FindTransactionByClientUseCase;
    beforeEach(() => {
        transactionRepository = mock();
        transactionRepository.findByClient.mockResolvedValue([{
            id: 'any_transaction',
            type: TransactionType.WITHDRAW,
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        }, {
            id: 'any_transaction',
            type: TransactionType.DEPOSIT,
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            
        }]);
        sut = new FindTransactionByClientUseCase(transactionRepository);
    });
    it('should be able to create a transaction with WITHDRAW ', async () => {
        const request = await sut.execute('any_client_id');

        expect(request).toEqual([{
            id: 'any_transaction',
            type: TransactionType.WITHDRAW,
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        }, {
            id: 'any_transaction',
            type: TransactionType.DEPOSIT,
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            
        }]);
    });

    it('should be able to throw an AppError when client dont exists ', async () => {
        transactionRepository.findByClient.mockResolvedValueOnce([]);
        const request = async () => {
            await sut.execute('any_client_id');
        };
        expect(request).rejects.toEqual({
            message: 'Client Doesnt Have Transactions',
            statusCode: 404,
        });
    });
});
