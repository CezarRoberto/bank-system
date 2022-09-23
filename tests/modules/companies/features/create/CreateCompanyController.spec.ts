import { ICompanyRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { CreateCompanyController } from "@modules/companies/useCases/createCompany/createCompanyController";
import { CreateCompanyUseCase } from "@modules/companies/useCases/createCompany/createCompanyUseCase";
import { mock, MockProxy } from "jest-mock-extended";
import { container } from "tsyringe";

const tsyringeContainerMock = jest.spyOn(container, 'resolve');


describe('CreateCompanyController', () => {
    let companiesRepository: MockProxy<ICompanyRepository>
    let sut: CreateCompanyController;

    beforeEach(() => {
        companiesRepository = mock<ICompanyRepository>();
        companiesRepository.create.mockResolvedValue({
            id: 'any_id',
            name: 'any_name',
            cnpj: 'any_cnpj',
            code: 'any_code',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
        companiesRepository.findByCNPJ.mockResolvedValue(null);
        tsyringeContainerMock.mockImplementation(() => ({
            execute: (params: any) => {
              const company = new CreateCompanyUseCase(companiesRepository);
              return company.execute(params);
            },
          }));
      sut = new CreateCompanyController();
    })

    it('should be able to retrun 200 and a company', async () => {
        const BodyRequest = {
            name: 'any_name',
            cnpj: 'any_cnpj',
            code: 'any_code',
          };
          const ResponseJson = {
            id: 'any_id',
            name: 'any_name',
            cnpj: 'any_cnpj',
            code: 'any_code',
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
            cnpj: 'any_cnpj',
            code: 'any_code',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
    })

    expect(request.body).toEqual(BodyRequest);
    });
});