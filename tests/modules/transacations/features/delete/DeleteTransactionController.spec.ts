import { TransactionRepository } from '@modules/transactions/repositories/implementation/TransactionRepository';
import { DeleteTransactionController } from '@modules/transactions/useCases/deleteTransaction/deleteTransactionController';
import { DeleteTransactionUseCase } from '@modules/transactions/useCases/deleteTransaction/deleteTransactionUseCase';
import { mock, MockProxy } from 'jest-mock-extended';
import { container } from 'tsyringe';

const tsyringeContainerMock = jest.spyOn(container, 'resolve');

describe('DeleteTransactionController', () => {
    let transactionRepository: MockProxy<TransactionRepository>;
    let sut: DeleteTransactionController;

    beforeEach(() => {
        transactionRepository = mock();
        transactionRepository.findById.mockResolvedValue({
            id: 'any_transaction',
            type: 'WITHDRAW',
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
        transactionRepository.deleteTransaction.mockResolvedValue({
            id: 'any_transaction',
            type: 'WITHDRAW',
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
        tsyringeContainerMock.mockImplementation(() => ({
            execute: (params: any) => {
                const transaction = new DeleteTransactionUseCase(
                    transactionRepository,
                );
                return transaction.execute(params);
            },
        }));

        sut = new DeleteTransactionController();
    });

    it('should be able to return 200 and delete transaction', async () => {
        const ParamsRequest = {
            id: 'any_id',
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
        expect(response.status().json).toBeCalledWith({ message: 'Deleted' });
        expect(request.params).toEqual({ id: 'any_id' });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        tsyringeContainerMock.mockImplementationOnce(() => null);
    });
});
