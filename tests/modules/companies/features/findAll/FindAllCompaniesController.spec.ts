import { ICompanyRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { FindAllCompaniesController } from "@modules/companies/useCases/findAllCompanies/findAllCompanyController";
import { FindAllCompaniesUseCase } from "@modules/companies/useCases/findAllCompanies/findAllCompanyUseCase";
import { FindOneCompanyController } from "@modules/companies/useCases/findOneCompany/findOneCompanyController";
import { findOneCompanyUseCase } from "@modules/companies/useCases/findOneCompany/findOneCompanyUseCase";
import { mock, MockProxy } from "jest-mock-extended";
import { container } from "tsyringe";

const tsyringeContainerMock = jest.spyOn(container, 'resolve');


describe('FindOneCompanyController', () => {
    let companiesRepository: MockProxy<ICompanyRepository>
    let sut: FindAllCompaniesController;

    beforeEach(() => {
        companiesRepository = mock<ICompanyRepository>();
        companiesRepository.findAll.mockResolvedValue([
            {
                id: 'any_id',
                name: 'any_name',
                cnpj: 'any_cnpj',
                code: 'any_code',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            },
            {
                id: 'any_id',
                name: 'any_name',
                cnpj: 'any_cnpj',
                code: 'any_code',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            },
        ]);
        tsyringeContainerMock.mockImplementation(() => ({
            execute: () => {
              const companies = new FindAllCompaniesUseCase(companiesRepository);
              return companies.execute();
            },
          }));
      sut = new FindAllCompaniesController();
    })

    it('should be able to retrun 200 and a company', async () => {

          const ResponseJson = [
            {
                id: 'any_id',
                name: 'any_name',
                cnpj: 'any_cnpj',
                code: 'any_code',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            },
            {
                id: 'any_id',
                name: 'any_name',
                cnpj: 'any_cnpj',
                code: 'any_code',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            },
        ];
          const request: any = {
            params: jest.fn(),
          };
          const statusResponse = { json: jest.fn().mockReturnValue(ResponseJson) };
          const response: any = {
            json: jest.fn(),
            status: jest.fn(() => statusResponse),
          };
          await sut.handle(request, response);
      
    expect(response.status).toBeCalledWith(200);
    expect(response.status().json()).toEqual([
        {
            id: 'any_id',
            name: 'any_name',
            cnpj: 'any_cnpj',
            code: 'any_code',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        },
        {
            id: 'any_id',
            name: 'any_name',
            cnpj: 'any_cnpj',
            code: 'any_code',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        },
    ])
    });
});