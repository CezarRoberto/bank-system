import { ICreateCompanyDTO } from "../dtos/ICreateCompanyDTO";
import { Clients, Company } from "@prisma/client";

interface ICompanyRepository {
    create({name, cnpj, code, clients}: ICreateCompanyDTO): Promise<Company>
    findById(id: string): Promise<Company>
    findByCNPJ(cnpj: string): Promise<Company>
    findAll(): Promise<Company[]>
    deleteCompanyById(id: string): Promise<Company>
    addClientsToCompany(clients: Clients[]): Promise<Company>
    createAdd({name, cnpj, code}: ICreateCompanyDTO): Promise<Company>
}

export {ICompanyRepository}