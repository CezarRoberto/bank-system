import { ClientRepository } from "@modules/clients/repositories/implementations/ClientRepository";
import { DeleteClientController } from "@modules/clients/useCases/deleteClient/deleteClientController";
import { DeleteClientUseCase } from "@modules/clients/useCases/deleteClient/deleteClientUseCase";
import { mock, MockProxy } from "jest-mock-extended";
import { container } from "tsyringe";

const tsyringeContainerMock = jest.spyOn(container, 'resolve');


describe('DeleteClientController', () => {
    let clientRepository: MockProxy<ClientRepository>
    let sut: DeleteClientController;

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
        tsyringeContainerMock.mockImplementation(() => ({
            execute: (params: any) => {
              const client = new DeleteClientUseCase(clientRepository);
              return client.execute(params);
            },
          }));
      sut = new DeleteClientController();
    })

    it('should be able to retrun 200 and delete a client', async () => {
        const ParamsRequest = {
          id: 'any_id'
          };
          const ResponseJson = {
            "message": "deleted"
          };
          const request: any = {
            params: ParamsRequest,
          };
          const statusResponse = { json: jest.fn().mockReturnValue(ResponseJson) };
          const response: any = {
            json: jest.fn(),
            status: jest.fn(() => statusResponse),
          };
          await sut.handle(request, response);
      
    expect(response.status).toBeCalledWith(200);
    expect(response.status().json()).toEqual({
        "message": "deleted"
    })

    expect(request.params).toEqual(ParamsRequest);
    });
});