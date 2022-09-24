import { mock, MockProxy } from 'jest-mock-extended';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { DeleteClientUseCase } from '@modules/clients/useCases/deleteClient/deleteClientUseCase';

describe('DeleteClientUseCase', () => {
    let clientRepository: MockProxy<ClientRepository>;
    let sut: DeleteClientUseCase;

    beforeEach(() => {
        clientRepository = mock<ClientRepository>();
        clientRepository.deleteById.mockResolvedValue({
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
        sut = new DeleteClientUseCase(clientRepository);
    });

    it('should be able to delete a client', async () => {
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
        clientRepository.deleteById.mockResolvedValueOnce(null);
        const request = async () => {
            return await sut.execute('any_id');
        };

        expect(request()).rejects.toEqual({
            message: 'Client Doesnt Exists',
            statusCode: 404,
        });
    });
});
