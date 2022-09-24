import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { FindClientsByBankController } from '@modules/clients/useCases/FindByBank/findClientByBankController';
import { FindAllClientsByBankUseCase } from '@modules/clients/useCases/FindByBank/findClientsByBankUseCase';
import { mock, MockProxy } from 'jest-mock-extended';
import { container } from 'tsyringe';

const tsyringeContainerMock = jest.spyOn(container, 'resolve');

describe('FindClientsByBankController', () => {
    let clientRepository: MockProxy<ClientRepository>;
    let sut: FindClientsByBankController;

    beforeEach(() => {
        clientRepository = mock<ClientRepository>();
        clientRepository.findAllByBank.mockResolvedValue([
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
            execute: (params: any) => {
                const client = new FindAllClientsByBankUseCase(
                    clientRepository,
                );
                return client.execute(params);
            },
        }));
        sut = new FindClientsByBankController();
    });

    it('should be able to retrun 200 and all clients', async () => {
        const ParamsRequest = {
            company_id: 'any_company_id',
        };

        const request: any = {
            params: jest.fn().mockReturnValueOnce(ParamsRequest),
        };
        const statusResponse = {
            json: jest.fn(),
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
        expect(request.params()).toEqual({ company_id: 'any_company_id' });
    });
});
