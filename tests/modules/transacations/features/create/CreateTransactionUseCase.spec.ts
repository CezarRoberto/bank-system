import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { TransactionRepository } from '@modules/transactions/repositories/implementation/TransactionRepository';
import { CreateTransactionUseCase } from '@modules/transactions/useCases/createTransaction/createTransactionUseCase';
import { TransactionType } from '@prisma/client';
import { mock, MockProxy } from 'jest-mock-extended';

describe('CreateTransactionUseCase', () => {
    let transactionRepository: MockProxy<TransactionRepository>;
    let clientRepository: MockProxy<ClientRepository>;
    let sut: CreateTransactionUseCase;
    beforeEach(() => {
        transactionRepository = mock();
        clientRepository = mock();
        clientRepository.findById.mockResolvedValue({
            id: 'any_id',
            name: 'any_name',
            cpf: 'any_cpf',
            email: 'any_email',
            password: 'any_password',
            company_id: 'any_company_id',
            credits: 'any_credits',
            amount: 100,
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
        transactionRepository.create.mockResolvedValue({
            id: 'any_transaction',
            type: TransactionType.WITHDRAW,
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });

        sut = new CreateTransactionUseCase(
            transactionRepository,
            clientRepository,
        );
    });
    it('should be able to create a transaction with WITHDRAW ', async () => {
        const request = await sut.execute({
            type: 'WITHDRAW',
            amount: 10,
            client_id: 'any_client_id',
        });

        expect(request).toEqual({
            id: 'any_transaction',
            type: TransactionType.WITHDRAW,
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
    });

    it('should be able to create a transaction with DEPOSIT ', async () => {
        transactionRepository.create.mockResolvedValueOnce({
            id: 'any_transaction',
            type: TransactionType.DEPOSIT,
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
        const request = await sut.execute({
            type: 'DEPOSIT',
            amount: 10,
            client_id: 'any_client_id',
        });

        expect(request).toEqual({
            id: 'any_transaction',
            type: TransactionType.DEPOSIT,
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
    });

    it('should be able to throw an AppError when transaction type is wrong ', async () => {
        const request = async () => {
            await sut.execute({
                type: 'any_type',
                amount: 10,
                client_id: 'any_client_id',
            });
        };
        expect(request).rejects.toEqual({
            message: 'Please, insert a valid type',
            statusCode: 409,
        });
    });

    it('should be able to throw an AppError when client dont exists ', async () => {
        clientRepository.findById.mockResolvedValueOnce(null)
        const request = async () => {
            await sut.execute({
                type: 'any_type',
                amount: 10,
                client_id: 'any_client_id',
            });
        };
        expect(request).rejects.toEqual({
            message: 'Client Doesnt Exists',
            statusCode: 404,
        });
    });
});
