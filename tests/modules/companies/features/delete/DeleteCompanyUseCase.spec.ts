import { ICompanyRepository } from '@modules/companies/repositories/ICompaniesRepository';
import { DeleteCompanyUseCase } from '@modules/companies/useCases/deleteCompany/deleteCompanyUseCase';
import { mock, MockProxy } from 'jest-mock-extended';

describe('DeleteCompanyUseCase', () => {
    let companiesRepository: MockProxy<ICompanyRepository>;
    let sut: DeleteCompanyUseCase;

    beforeEach(() => {
        companiesRepository = mock<ICompanyRepository>();
        companiesRepository.deleteById.mockResolvedValue(
            {
                id: 'any_id',
                name: 'any_name',
                cnpj: 'any_cnpj',
                code: 'any_code',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            });
        sut = new DeleteCompanyUseCase(companiesRepository);
    });

    it('should be able to delete a company', async () => {
        const request = await sut.execute('any_id');

        expect(request).toStrictEqual({
            id: 'any_id',
            name: 'any_name',
            cnpj: 'any_cnpj',
            code: 'any_code',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
    });

    it('should be able to throw a AppError', async () => {
        companiesRepository.deleteById.mockResolvedValueOnce(null);
        const request = async () => {
            return await sut.execute('any_id');
        };

        expect(request()).rejects.toEqual({
            message: 'This Company Doesnt exists',
            statusCode: 404,
        });
    });
});
