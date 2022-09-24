import { mock, MockProxy } from 'jest-mock-extended';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { GoogleSignInProvider } from '@shared/providers/googleSIngIn/implementation/GoogleSignInProvider';
import { GoogleSignInUseCase } from '@modules/clients/useCases/googleSinIn/GoogleSignInUseCase';

describe('CreateClientUseCase', () => {
    let clientRepository: MockProxy<ClientRepository>;
    let googleSignInProvider: MockProxy<GoogleSignInProvider>;
    let sut: GoogleSignInUseCase;

    beforeEach(() => {
        clientRepository = mock<ClientRepository>();
        googleSignInProvider = mock<GoogleSignInProvider>();
        clientRepository.update.mockResolvedValue({
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
        googleSignInProvider.signIn.mockResolvedValue({
            aud: 'any_aud',
            iat: 10,
            iss: 'https://accounts.google.com',
            sub: '102102101',
            exp: 20,
            email: 'any_email',
            name: 'any_name',
        });
        clientRepository.findByCPF.mockResolvedValue({
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
        sut = new GoogleSignInUseCase(clientRepository, googleSignInProvider);
    });

    it('should be able to create a new client', async () => {
        const request = await sut.execute({
            token: 'any_token',
            cpf: 'any_cpf',
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
        googleSignInProvider.signIn.mockResolvedValueOnce(null);
        const request = async () => {
            return await sut.execute({
                token: 'any_token',
                cpf: 'any_cpf',
                company_id: 'any_company_id',
                credits: 'any_credits',
                amount: 100,
            });
        };

        expect(request()).rejects.toEqual({
            message: 'Something went wrong with your google account',
            statusCode: 409,
        });
    });

    it('should be able to create a new client', async () => {
        clientRepository.findByCPF.mockResolvedValueOnce(null);
        const request = async () => {
            return await sut.execute({
                token: 'any_token',
                cpf: 'any_cpf',
                company_id: 'any_company_id',
                credits: 'any_credits',
                amount: 100,
            });
        };

        expect(request()).rejects.toEqual({
            message: 'You must be create a account first',
            statusCode: 409,
        });
    });
});
