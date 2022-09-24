import { mock, MockProxy } from 'jest-mock-extended';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { FindOneClientUseCase } from '@modules/clients/useCases/findOneClient/FindOneClientUseCase';

describe('FindOneClientUseCase', () => {
    let clientRepository: MockProxy<ClientRepository>;
    let sut: FindOneClientUseCase;

    beforeEach(() => {
        clientRepository = mock<ClientRepository>();
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
        sut = new FindOneClientUseCase(clientRepository);
    });

    it('should be able to find one client by id', async () => {
        const request = await sut.execute('any_id');

        expect(request).toStrictEqual({
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
    });

    it('should be able to throw AppError', async () => {
        clientRepository.findById.mockResolvedValueOnce(null);
        const request = async () => {
            return await sut.execute('any_id');
        };

        expect(request()).rejects.toEqual({
            message: 'Client Doesnt Exists',
            statusCode: 404,
        });
    });
});
