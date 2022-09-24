import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { FindAllClientsController } from '@modules/clients/useCases/findAllClients/findAllClientsController';
import { FindAllClientsUseCase } from '@modules/clients/useCases/findAllClients/findAllClientsUseCase';
import { mock, MockProxy } from 'jest-mock-extended';
import { container } from 'tsyringe';

const tsyringeContainerMock = jest.spyOn(container, 'resolve');

describe('FindAllClientsController', () => {
    let clientRepository: MockProxy<ClientRepository>;
    let sut: FindAllClientsController;

    beforeEach(() => {
        clientRepository = mock<ClientRepository>();
        clientRepository.findAll.mockResolvedValue([
            {
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
            },
            {
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
            },
        ]);
        tsyringeContainerMock.mockImplementation(() => ({
            execute: () => {
                const client = new FindAllClientsUseCase(clientRepository);
                return client.execute();
            },
        }));
        sut = new FindAllClientsController();
    });

    it('should be able to retrun 200 and all clients', async () => {
        const request: any = {
            params: jest.fn(),
        };
        const statusResponse = {
            json: jest.fn()
        };
        const response: any = {
            json: jest.fn(),
            status: jest.fn(() => statusResponse),
        };
        await sut.handle(request, response);

        expect(response.status).toBeCalledWith(200);
        expect(response.status().json).toBeCalledWith([
            {
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
            },
            {
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
            },
        ]);
    });
});
