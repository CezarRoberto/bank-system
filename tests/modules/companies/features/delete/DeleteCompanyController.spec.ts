import { ICompanyRepository } from '@modules/companies/repositories/ICompaniesRepository';
import { DeleteCompanyController } from '@modules/companies/useCases/deleteCompany/deleteCompanyController';
import { DeleteCompanyUseCase } from '@modules/companies/useCases/deleteCompany/deleteCompanyUseCase';
import { mock, MockProxy } from 'jest-mock-extended';
import { container } from 'tsyringe';

const tsyringeContainerMock = jest.spyOn(container, 'resolve');

describe('DeleteCompanyController', () => {
    let companiesRepository: MockProxy<ICompanyRepository>;
    let sut: DeleteCompanyController;

    beforeEach(() => {
        companiesRepository = mock<ICompanyRepository>();
        companiesRepository.deleteById.mockResolvedValue({
            id: 'any_id',
            name: 'any_name',
            cnpj: 'any_cnpj',
            code: 'any_code',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
        tsyringeContainerMock.mockImplementation(() => ({
            execute: (params: any) => {
                const company = new DeleteCompanyUseCase(companiesRepository);
                return company.execute(params);
            },
        }));
        sut = new DeleteCompanyController();
    });

    it('should be able to retrun 200 and a deleted message', async () => {
        const ParamsRequest = {
            id: 'any_id',
        };
        const request: any = {
            params: ParamsRequest,
        };
        const BodyResponse = {
            message: 'Deleted'
        }
        const statusResponse = { json: jest.fn().mockReturnValue(BodyResponse) };
        const response: any = {
            json: jest.fn(),
            status: jest.fn(() => statusResponse),
        };
        await sut.handle(request, response);

        expect(response.status).toBeCalledWith(200);
        expect(response.status().json()).toEqual({ message: 'Deleted' });
    });
});
