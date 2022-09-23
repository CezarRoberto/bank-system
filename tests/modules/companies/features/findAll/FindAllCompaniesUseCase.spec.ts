import { ICompanyRepository } from '@modules/companies/repositories/ICompaniesRepository';
import { FindAllCompaniesUseCase } from '@modules/companies/useCases/findAllCompanies/findAllCompanyUseCase';
import { mock, MockProxy } from 'jest-mock-extended';

describe('FindAllCompaniesUseCase', () => {
    let companiesRepository: MockProxy<ICompanyRepository>;
    let sut: FindAllCompaniesUseCase;

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
        sut = new FindAllCompaniesUseCase(companiesRepository);
    });

    it('should be able to find all companies', async () => {
        const request = await sut.execute();

        expect(request).toStrictEqual([
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
    });

    it('should be able to throw a AppError', async () => {
        companiesRepository.findAll.mockResolvedValueOnce([]);
        const request = async () => {
            return await sut.execute();
        };

        expect(request()).rejects.toEqual({
            message: 'No Companies have been found',
            statusCode: 404,
        });
    });
});
