import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { GoogleSignInController } from '@modules/clients/useCases/googleSinIn/GoogleSignInController';
import { GoogleSignInUseCase } from '@modules/clients/useCases/googleSinIn/GoogleSignInUseCase';
import { GoogleSignInProvider } from '@shared/providers/googleSIngIn/implementation/GoogleSignInProvider';
import { mock, MockProxy } from 'jest-mock-extended';
import { container } from 'tsyringe';

const tsyringeContainerMock = jest.spyOn(container, 'resolve');

describe('GoogleSignInController', () => {
    let clientRepository: MockProxy<ClientRepository>;
    let googleSignInProvider: MockProxy<GoogleSignInProvider>;
    let sut: GoogleSignInController;

    beforeEach(() => {
        clientRepository = mock<ClientRepository>();
        googleSignInProvider = mock<GoogleSignInProvider>()
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
        tsyringeContainerMock.mockImplementation(() => ({
            execute: (params: any) => {
                const client = new GoogleSignInUseCase(
                    clientRepository,
                    googleSignInProvider,
                );
                return client.execute(params);
            },
        }));
        sut = new GoogleSignInController();
    });

    it('should be able to retrun 200 and a client', async () => {
        const BodyRequest = {
            cpf: 'any_cpf',
            token: 'any_token',
            company_id: 'any_company_id',
            credits: 'any_credits',
            amount: 100,
        };
        const ResponseJson = {
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
        };
        const request: any = {
            body: BodyRequest,
        };
        const statusResponse = {
            json: jest.fn().mockReturnValue(ResponseJson),
        };
        const response: any = {
            json: jest.fn(),
            status: jest.fn(() => statusResponse),
        };
        await sut.handle(request, response);

        expect(response.status).toBeCalledWith(200);
        expect(response.status().json()).toEqual({
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

        expect(request.body).toEqual(BodyRequest);
    });
});
