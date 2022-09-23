import { ICreateCompanyDTO } from '@modules/companies/dtos/ICreateCompanyDTO';
import { Company } from '@prisma/client';
import prismaClient from '@shared/infra/prisma';
import { Context } from '@shared/infra/prisma/context';
import { ICompanyRepository } from '../ICompaniesRepository';

class CompanyRepository implements ICompanyRepository {
    constructor(private readonly ctx: Context = { prisma: prismaClient }) {}
    async create({ name, cnpj, code }: ICreateCompanyDTO): Promise<Company> {
        const company = await this.ctx.prisma.company.create({
            data: {
                name,
                cnpj,
                code,
            },
        });

        return company;
    }

    async findById(id: string): Promise<Company | null> {
        const company = await this.ctx.prisma.company.findUnique({
            where: { id },
        });

        return company;
    }

    async findByCNPJ(cnpj: string): Promise<Company | null> {
        const company = await this.ctx.prisma.company.findFirst({
            where: { cnpj },
        });

        return company;
    }

    async findAll(): Promise<Company[]> {
        const companies = await this.ctx.prisma.company.findMany();
        return companies;
    }

    async deleteById(id: string): Promise<Company | null> {
        const company = await this.ctx.prisma.company.delete({
            where: { id },
        });
        return company;
    }
}
export { CompanyRepository };
