import { ClientRepository } from "@modules/clients/repositories/implementations/ClientRepository";
import { CreateClientController } from "@modules/clients/useCases/createClient/CreateClientController";
import { CreateClientUseCase } from "@modules/clients/useCases/createClient/CreateClientUseCase";
import { ICompanyRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { mock, MockProxy } from "jest-mock-extended";
import { container } from "tsyringe";

const tsyringeContainerMock = jest.spyOn(container, 'resolve');


describe('CreateClientController', () => {
    let clientRepository: MockProxy<ClientRepository>
    let sut: CreateClientController;

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
        tsyringeContainerMock.mockImplementation(() => ({
            execute: (params: any) => {
              const client = new CreateClientUseCase(clientRepository);
              return client.execute(params);
            },
          }));
      sut = new CreateClientController();
    })

    it('should be able to retrun 200 and a client', async () => {
        const BodyRequest = {
          name: 'any_name',
          cpf: 'any_cpf',
          email: 'any_email',
          password: 'any_password',
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
          const statusResponse = { json: jest.fn().mockReturnValue(ResponseJson) };
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
    })

    expect(request.body).toEqual(BodyRequest);
    });
});