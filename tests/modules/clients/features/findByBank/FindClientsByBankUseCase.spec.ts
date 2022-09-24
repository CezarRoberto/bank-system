import { mock, MockProxy } from 'jest-mock-extended';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { FindAllClientsByBankUseCase } from '@modules/clients/useCases/FindByBank/findClientsByBankUseCase';

describe('FindAllClientsByBankUseCase', () => {
    let clientRepository: MockProxy<ClientRepository>;
    let sut: FindAllClientsByBankUseCase;

    beforeEach(() => {
        clientRepository = mock<ClientRepository>();
        clientRepository.findAllByBank.mockResolvedValue([{
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
        sut = new FindAllClientsByBankUseCase(clientRepository);
    });

    it('should be able to find all clients by bank Id', async () => {
        const request = await sut.execute('any_company_id');

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
        clientRepository.findAllByBank.mockResolvedValueOnce([]);
        const request = async () => {
            return await sut.execute('any_company_id');
        };

        expect(request()).rejects.toEqual({
            message: 'Clients Doesnt Registred',
            statusCode: 404,
        });
    });
});
