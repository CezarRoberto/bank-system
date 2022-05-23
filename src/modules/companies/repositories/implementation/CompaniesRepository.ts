
import { ICreateCompanyDTO } from "@modules/companies/dtos/ICreateCompanyDTO";
import { Company } from "@prisma/client";
import prismaClient from "@shared/infra/prisma";
import { ICompanyRepository } from "../ICompaniesRepository";

class CompanyRepository implements ICompanyRepository {
    async create({ name, cnpj, code }: ICreateCompanyDTO): Promise<Company> {
        const company = await prismaClient.company.create({
            data: {
                name,
                cnpj,
                code
            }
        })

        return company
    }

    async findById(id: string): Promise<Company> {
        const company = await prismaClient.company.findUnique({
            where: {id}
        })

        return company as Company
    }

    async findByCNPJ(cnpj: string): Promise<Company> {
        const company = await prismaClient.company.findFirst({
            where: {cnpj}
        })

        return company as Company
    }

    async findAll(): Promise<Company[]> {
        const companies = await prismaClient.company.findMany()
        return companies
    }

    async deleteById(id: string): Promise<Company> {
        const company = await prismaClient.company.delete({
            where: {id}
        })
        return company
    }
}
export {CompanyRepository}