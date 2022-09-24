import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { TransactionRepository } from '@modules/transactions/repositories/implementation/TransactionRepository';
import { CreateTransactionController } from '@modules/transactions/useCases/createTransaction/createTransactionController';
import { CreateTransactionUseCase } from '@modules/transactions/useCases/createTransaction/createTransactionUseCase';
import { mock, MockProxy } from 'jest-mock-extended';
import { container } from 'tsyringe';

const tsyringeContainerMock = jest.spyOn(container, 'resolve');

describe('CreateTransactionController', () => {
    let transactionRepository: MockProxy<TransactionRepository>;
    let clientRepository: MockProxy<ClientRepository>;
    let sut: CreateTransactionController;

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
            type: 'WITHDRAW',
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
        tsyringeContainerMock.mockImplementation(() => ({
            execute: (params: any) => {
                const transaction = new CreateTransactionUseCase(
                    transactionRepository,
                    clientRepository,
                );
                return transaction.execute(params);
            },
        }));

        sut = new CreateTransactionController();
    });

    it('should be able to return 200 and a transaction', async () => {
        const BodyRequest = {
            type: 'WITHDRAW',
            amount: 10,
            client_id: 'any_client_id',
        };

        const request: any = {
            body: BodyRequest,
        };

        const Status = {
            id: 'any_transaction',
            type: 'WITHDRAW',
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        };
        const statusResponse = { json: jest.fn().mockReturnValue(Status) };
        const response: any = {
            json: jest.fn(),
            status: jest.fn(() => statusResponse),
            sendStatus: jest.fn(),
        };
        await sut.handle(request, response);

        expect(response.status).toBeCalledWith(200);
        expect(response.status().json()).toEqual({
            id: 'any_transaction',
            type: 'WITHDRAW',
            amount: 10,
            client_id: 'any_client_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        tsyringeContainerMock.mockImplementationOnce(() => null);
    });
});
