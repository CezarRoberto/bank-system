import { ICompanyRepository } from '@modules/companies/repositories/ICompaniesRepository';
import { findOneCompanyUseCase } from '@modules/companies/useCases/findOneCompany/findOneCompanyUseCase';
import { mock, MockProxy } from 'jest-mock-extended';

describe('FindOneClientUseCase', () => {
    let companiesRepository: MockProxy<ICompanyRepository>;
    let sut: findOneCompanyUseCase;

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
        sut = new findOneCompanyUseCase(companiesRepository);
    });

    it('should be able to find a company', async () => {
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

    it('should be able to create a new company', async () => {
        companiesRepository.findById.mockResolvedValueOnce(null);
        const request = async () => {
            return await sut.execute('any_id');
        };

        expect(request()).rejects.toEqual({
            message: 'This Company Doesnt exists',
            statusCode: 404,
        });
    });
});
