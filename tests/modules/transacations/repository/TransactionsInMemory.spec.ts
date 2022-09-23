import { ICreateTransactionDTO } from "@modules/transactions/dtos/ICreateTransactionsDTO";
import { TransactionRepository } from "@modules/transactions/repository/implementation/TransactionRepository";
import { TransactionType } from "@prisma/client";
import { Context, createMockContext, MockContext } from "@shared/infra/prisma/context";

describe('Transactions', () => {
    let mockCtx: MockContext;
    let ctx: Context;
    let sut: TransactionRepository;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
        sut = new TransactionRepository(ctx);
    });

    describe('Create', () => {
        it('should be able to create a new transactions with WITHDRAW', async () => {
            const transaction = {
                id: 'any_transaction',
                type: TransactionType.WITHDRAW,
                amount: 10,
                client_id: 'any_client_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            }

            const client = {
                id: 'any_id',
                name: 'any_name',
                cpf: 'any_cpf',
                email: 'any_email',
                password: 'any_password',
                company_id: 'any_company_id',
                credits: 'any_credits',
                amount: 90,
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            };

            mockCtx.prisma.$transaction.mockResolvedValueOnce([
                mockCtx.prisma.client.update.mockResolvedValueOnce(client)
            ])

            mockCtx.prisma.transactions.create.mockResolvedValueOnce(transaction)

            const data: ICreateTransactionDTO = {
                type: 'WITHDRAW',
                amount: 10,
                client_id: 'any_client_id'
            }

            const request = await sut.create(data)

            expect(request).toEqual(transaction)
        });

        it('should be able to create a new transactions with DEPOSIT', async () => {
            const transaction = {
                id: 'any_transaction',
                type: TransactionType.DEPOSIT,
                amount: 10,
                client_id: 'any_client_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            }

            const client = {
                id: 'any_id',
                name: 'any_name',
                cpf: 'any_cpf',
                email: 'any_email',
                password: 'any_password',
                company_id: 'any_company_id',
                credits: 'any_credits',
                amount: 110,
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            };

            mockCtx.prisma.$transaction.mockResolvedValueOnce([
                mockCtx.prisma.client.update.mockResolvedValueOnce(client)
            ])

            mockCtx.prisma.transactions.create.mockResolvedValueOnce(transaction)

            const data: ICreateTransactionDTO = {
                type: 'DEPOSIT',
                amount: 10,
                client_id: 'any_client_id'
            }

            const request = await sut.create(data)

            expect(request).toEqual(transaction)
        });
    });

    describe('Delete', () => {
        it('should be able to delete transactions with WITHDRAW', async () => {
            const transaction = {
                id: 'any_transaction',
                type: TransactionType.WITHDRAW,
                amount: 10,
                client_id: 'any_client_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            }

            const client = {
                id: 'any_id',
                name: 'any_name',
                cpf: 'any_cpf',
                email: 'any_email',
                password: 'any_password',
                company_id: 'any_company_id',
                credits: 'any_credits',
                amount: 90,
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            };

            mockCtx.prisma.$transaction.mockResolvedValueOnce([
                mockCtx.prisma.client.update.mockResolvedValueOnce(client)
            ])

            mockCtx.prisma.transactions.delete.mockResolvedValueOnce(transaction)

            const request = await sut.deleteTransaction('any_transaction')

            expect(request).toEqual(transaction)
        });

        it('should be able to create a new transactions with DEPOSIT', async () => {
            const transaction = {
                id: 'any_transaction',
                type: TransactionType.DEPOSIT,
                amount: 10,
                client_id: 'any_client_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            }

            const client = {
                id: 'any_id',
                name: 'any_name',
                cpf: 'any_cpf',
                email: 'any_email',
                password: 'any_password',
                company_id: 'any_company_id',
                credits: 'any_credits',
                amount: 110,
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            };

            mockCtx.prisma.$transaction.mockResolvedValueOnce([
                mockCtx.prisma.client.update.mockResolvedValueOnce(client)
            ])

            mockCtx.prisma.transactions.delete.mockResolvedValueOnce(transaction)

            const request = await sut.deleteTransaction('any_transaction')

            expect(request).toEqual(transaction)
        });
    });

    describe('Find By Client Id', () => {
        it('should be able to find a transaction by id', async () => {
            const transaction = {
                id: 'any_transaction',
                type: TransactionType.WITHDRAW,
                amount: 10,
                client_id: 'any_client_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            }

            mockCtx.prisma.transactions.findFirst.mockResolvedValueOnce(transaction)

            const request = await sut.findById('any_transaction')

            expect(request).toEqual(transaction)
        });

        it('should be able to return null when transaction does not exists', async () => {
            mockCtx.prisma.transactions.findFirst.mockResolvedValueOnce(null)

            const request = await sut.findById('any_transaction')

            expect(request).toEqual(null)
        });
    });

    describe('Find By Client', () => {
        it('should be able to find a transaction by id', async () => {
            const transaction = [{
                id: 'any_transaction',
                type: TransactionType.WITHDRAW,
                amount: 10,
                client_id: 'any_client_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            }, {
                id: 'any_transaction',
                type: TransactionType.WITHDRAW,
                amount: 10,
                client_id: 'any_client_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            }]

            mockCtx.prisma.transactions.findMany.mockResolvedValueOnce(transaction)

            const request = await sut.findByClient('any_client_id')

            expect(request).toEqual(transaction)
        });
    });
});