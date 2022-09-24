import { mock, MockProxy } from 'jest-mock-extended';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { FindAllClientsUseCase } from '@modules/clients/useCases/findAllClients/findAllClientsUseCase';

describe('FindAllClientsUseCase', () => {
    let clientRepository: MockProxy<ClientRepository>;
    let sut: FindAllClientsUseCase;

    beforeEach(() => {
        clientRepository = mock<ClientRepository>();
        clientRepository.findAll.mockResolvedValue([{
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
        }, {
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
        }]);
        sut = new FindAllClientsUseCase(clientRepository);
    });

    it('should be able to find all clients', async () => {
        const request = await sut.execute();

        expect(request).toStrictEqual([{
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
        }, {
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
        }]);
    });

    it('should be able to throw AppError', async () => {
        clientRepository.findAll.mockResolvedValueOnce([]);
        const request = async () => {
            return await sut.execute();
        };

        expect(request()).rejects.toEqual({
            message: 'No Clients have been found',
            statusCode: 404,
        });
    });
});
