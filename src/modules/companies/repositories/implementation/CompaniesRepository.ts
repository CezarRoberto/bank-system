import { ICreateCompanyDTO } from "@modules/companies/dtos/ICreateCompanyDTO";
import { Clients, Company } from "@prisma/client";
import prismaClient from "@shared/infra/prisma";
import { ICompanyRepository } from "../ICompaniesRepository";

class CompanyRepository implements ICompanyRepository {

    // CREATE
    async create({ name, cnpj, code, clients }: ICreateCompanyDTO): Promise<Company> {
        const company = await prismaClient.company.create({
            data: {
                name,
                cnpj,
                code,
            }
        })
        clients.forEach(async client => {
            await prismaClient.company.update({
                where: {
                    id: company.id,
                },
                data: {
                    clients: {
                        connect: [{ id: `${client.id}` }]
                    }
                }
            })
        })
        return company
    }

    async createAdd({ name, cnpj, code }: ICreateCompanyDTO): Promise<Company> {
        const company = await prismaClient.company.create({
            data: {
                name,
                cnpj,
                code
            }
        });
        return company
    }

    async addClientsToCompany(clients: Clients[]): Promise<Company> {
        clients.forEach(async clients => {
            await prismaClient.company.update({
                where: { 
                    id: clients.company_id 
                },
                data: {
                    clients: {
                        connect: [{ id: `${clients.id}` }]
                    }
                }
            })
        })
        const company = await this.findById(clients[0].company_id)
        return company as Company
    }

    // QUERIES 
    async findAll(): Promise<Company[]> {
        const companies = await prismaClient.company.findMany();
        return companies
    }

    async findByCNPJ(cnpj: string): Promise<Company> {
        const company = await prismaClient.company.findFirst({
            where: { cnpj }
        })
        return company as Company
    }

    async findById(id: string): Promise<Company> {
        const company = await prismaClient.company.findUnique({
            where: { id },
            include: {
                clients: true
            }
        })
        return company as Company
    }

    async deleteCompanyById(id: string): Promise<Company> {
        const company = await prismaClient.company.delete({
            where: { id }
        })
        return company
    }
}

export {CompanyRepository}