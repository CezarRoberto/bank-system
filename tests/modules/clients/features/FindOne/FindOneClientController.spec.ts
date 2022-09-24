import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { FindOneClientController } from '@modules/clients/useCases/findOneClient/FindOneClientController';
import { FindOneClientUseCase } from '@modules/clients/useCases/findOneClient/FindOneClientUseCase';
import { mock, MockProxy } from 'jest-mock-extended';
import { container } from 'tsyringe';

const tsyringeContainerMock = jest.spyOn(container, 'resolve');

describe('FindOneClientController', () => {
    let clientRepository: MockProxy<ClientRepository>;
    let sut: FindOneClientController;

    beforeEach(() => {
        clientRepository = mock<ClientRepository>();
        clientRepository.findById.mockResolvedValue(
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
        );
        tsyringeContainerMock.mockImplementation(() => ({
            execute: (params: any) => {
                const client = new FindOneClientUseCase(
                    clientRepository,
                );
                return client.execute(params);
            },
        }));
        sut = new FindOneClientController();
    });

    it('should be able to retrun 200 and one client', async () => {
        const ParamsRequest = {
            id: 'any_id',
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
        expect(response.status().json).toBeCalledWith(
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
        );
        expect(request.params()).toEqual({ id: 'any_id' });
    });
});
