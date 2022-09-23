import { ICompanyRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { FindOneCompanyController } from "@modules/companies/useCases/findOneCompany/findOneCompanyController";
import { findOneCompanyUseCase } from "@modules/companies/useCases/findOneCompany/findOneCompanyUseCase";
import { mock, MockProxy } from "jest-mock-extended";
import { container } from "tsyringe";

const tsyringeContainerMock = jest.spyOn(container, 'resolve');


describe('FindOneCompanyController', () => {
    let companiesRepository: MockProxy<ICompanyRepository>
    let sut: FindOneCompanyController;

    beforeEach(() => {
        companiesRepository = mock<ICompanyRepository>();
        companiesRepository.findById.mockResolvedValue({
            id: 'any_id',
            name: 'any_name',
            cnpj: 'any_cnpj',
            code: 'any_code',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
        tsyringeContainerMock.mockImplementation(() => ({
            execute: (params: any) => {
              const company = new findOneCompanyUseCase(companiesRepository);
              return company.execute(params);
            },
          }));
      sut = new FindOneCompanyController();
    })

    it('should be able to retrun 200 and a company', async () => {
        const ParamsRequest = {
            id: 'any_id'
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
        id: 'any_id',
            name: 'any_name',
            cnpj: 'any_cnpj',
            code: 'any_code',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
    })

    expect(request.params).toEqual(ParamsRequest);
    });
});