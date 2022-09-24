import { CreateClientUseCase } from '@modules/clients/useCases/createClient/CreateClientUseCase';
import { mock, MockProxy } from 'jest-mock-extended';
import bcrypt from 'bcryptjs';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';

const bcryptMock = jest.spyOn(bcrypt, 'hash');

describe('CreateClientUseCase', () => {
    let clientRepository: MockProxy<ClientRepository>;
    let sut: CreateClientUseCase;

    beforeEach(() => {
        clientRepository = mock<ClientRepository>();
        clientRepository.create.mockResolvedValue({
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
        clientRepository.findByEmail.mockResolvedValue(null);
        bcryptMock.mockImplementation(() => 'encrypt');
        sut = new CreateClientUseCase(clientRepository);
    });

    it('should be able to create a new client', async () => {
        const request = await sut.execute({
            name: 'any_name',
            cpf: 'any_cpf',
            email: 'any_email',
            password: 'any_password',
            company_id: 'any_company_id',
            credits: 'any_credits',
            amount: 100,
        });

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
        clientRepository.findByEmail.mockResolvedValueOnce({
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
        const request = async () => {
            return await sut.execute({
                name: 'any_name',
                cpf: 'any_cpf',
                email: 'any_email',
                password: 'any_password',
                company_id: 'any_company_id',
                credits: 'any_credits',
                amount: 100,
            });
        };

        expect(request()).rejects.toEqual({
            message: 'Client Already Exists',
            statusCode: 404,
        });
    });
});
