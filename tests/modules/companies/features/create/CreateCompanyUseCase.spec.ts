import { ICompanyRepository } from '@modules/companies/repositories/ICompaniesRepository';
import { CreateCompanyUseCase } from '@modules/companies/useCases/createCompany/createCompanyUseCase';
import { mock, MockProxy } from 'jest-mock-extended';

describe('CreateCompanyUseCase', () => {
    let companiesRepository: MockProxy<ICompanyRepository>;
    let sut: CreateCompanyUseCase;

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

        sut = new CreateCompanyUseCase(companiesRepository);
    });

    it('should be able to create a new company', async () => {
        const request = await sut.execute({
            name: 'any_name',
            cnpj: 'any_cnpj',
            code: 'any_code',
        });

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
        companiesRepository.findByCNPJ.mockResolvedValueOnce({
            id: 'any_id',
            name: 'any_name',
            cnpj: 'any_cnpj',
            code: 'any_code',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
        const request = async () => {
            return await sut.execute({
                name: 'any_name',
                cnpj: 'any_cnpj',
                code: 'any_code',
            });
        };

        expect(request()).rejects.toEqual({
            message: 'This Company Already Existis',
            statusCode: 404,
        });
    });
});
