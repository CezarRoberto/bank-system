import { ICreateCompanyDTO } from "@modules/companies/dtos/ICreateCompanyDTO";
import { CompanyRepository } from "@modules/companies/repositories/implementation/CompaniesRepository";
import { Context, createMockContext, MockContext } from "@shared/infra/prisma/context";

describe('Companies', () => {
    let mockCtx: MockContext;
    let ctx: Context;
    let sut: CompanyRepository;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
        sut = new CompanyRepository(ctx);
    });

    describe('Create', () => {
        it('should be able to create a company', async () => {
            const company = {
                id: 'any_id',
                name: 'any_name',
                cnpj: 'any_cnpj',
                code: 'any_code',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            }

            mockCtx.prisma.company.create.mockResolvedValueOnce(company)

            const data: ICreateCompanyDTO = {
                name: 'any_name',
                cnpj: 'any_cnpj',
                code: 'any_code',
            }

            const request = await sut.create(data);

            expect(request).toEqual(company)
        });
    });

    describe('Find by Id', () => {
        it('should be able to return company by id', async () => {
            const company = {
                id: 'any_id',
                name: 'any_name',
                cnpj: 'any_cnpj',
                code: 'any_code',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            }

            mockCtx.prisma.company.findUnique.mockResolvedValueOnce(company)

            const request = await sut.findById('any_id');

            expect(request).toEqual(company)
        });

        it('should be able to return null when company doesnt exists', async () => {
            mockCtx.prisma.company.findUnique.mockResolvedValueOnce(null)

            const request = await sut.findById('any_id');

            expect(request).toEqual(null)
        });
    });

    describe('Find by CNPJ', () => {
        it('should be able to return company by cnpj', async () => {
            const company = {
                id: 'any_id',
                name: 'any_name',
                cnpj: 'any_cnpj',
                code: 'any_code',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            }

            mockCtx.prisma.company.findFirst.mockResolvedValueOnce(company)

            const request = await sut.findByCNPJ('any_cnpj');

            expect(request).toEqual(company)
        });

        it('should be able to return null when company doesnt exists', async () => {
            mockCtx.prisma.company.findUnique.mockResolvedValueOnce(null)

            const request = await sut.findByCNPJ('any_id');

            expect(request).toEqual(undefined)
        });
    });

    describe('Find All', () => {
        it('should be able to return all companies', async () => {
            const company = [{
                id: 'any_id',
                name: 'any_name',
                cnpj: 'any_cnpj',
                code: 'any_code',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            }, {
                id: 'any_id',
                name: 'any_name',
                cnpj: 'any_cnpj',
                code: 'any_code',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            }]

            mockCtx.prisma.company.findMany.mockResolvedValueOnce(company)

            const request = await sut.findAll();

            expect(request).toEqual(company)
        });
    });

    describe('Delete', () => {
        it('should be able to delete a company by id', async () => {
            const company = {
                id: 'any_id',
                name: 'any_name',
                cnpj: 'any_cnpj',
                code: 'any_code',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            };

            mockCtx.prisma.company.delete.mockResolvedValueOnce(company)

            const request = await sut.deleteById('any_id');

            expect(request).toEqual(company)
        });
    });
});