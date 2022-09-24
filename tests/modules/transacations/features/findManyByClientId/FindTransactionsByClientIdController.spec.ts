import { TransactionRepository } from '@modules/transactions/repositories/implementation/TransactionRepository';
import { FindTransactionsByClientController } from '@modules/transactions/useCases/findTransactionByClient/findTransactionByClientController';
import { FindTransactionByClientUseCase } from '@modules/transactions/useCases/findTransactionByClient/findTransactionByClientUseCase';
import { mock, MockProxy } from 'jest-mock-extended';
import { container } from 'tsyringe';

const tsyringeContainerMock = jest.spyOn(container, 'resolve');

describe('FindTransactionsByClientController', () => {
    let transactionRepository: MockProxy<TransactionRepository>;
    let sut: FindTransactionsByClientController;

    beforeEach(() => {
        transactionRepository = mock();
        transactionRepository.findByClient.mockResolvedValue([
            {
                id: 'any_transaction',
                type: 'WITHDRAW',
                amount: 10,
                client_id: 'any_client_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            },
            {
                id: 'any_transaction',
                type: 'WITHDRAW',
                amount: 10,
                client_id: 'any_client_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            },
        ]);
        tsyringeContainerMock.mockImplementation(() => ({
            execute: (params: any) => {
                const transactions = new FindTransactionByClientUseCase(
                    transactionRepository,
                );
                return transactions.execute(params);
            },
        }));

        sut = new FindTransactionsByClientController();
    });

    it('should be able to return 200 and all transacations ', async () => {
        const ParamsRequest = {
            client_id: 'any_client_id',
        };

        const request: any = {
            params: ParamsRequest,
        };

        const statusResponse = { json: jest.fn() };
        const response: any = {
            json: jest.fn(),
            status: jest.fn(() => statusResponse),
            sendStatus: jest.fn(),
        };
        await sut.handle(request, response);

        expect(response.status).toBeCalledWith(200);
        expect(response.status().json).toBeCalledWith([
            {
                id: 'any_transaction',
                type: 'WITHDRAW',
                amount: 10,
                client_id: 'any_client_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            },
            {
                id: 'any_transaction',
                type: 'WITHDRAW',
                amount: 10,
                client_id: 'any_client_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            },
        ]);
        expect(request.params).toEqual({ client_id: 'any_client_id' });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        tsyringeContainerMock.mockImplementationOnce(() => null);
    });
});
