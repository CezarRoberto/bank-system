import { Company } from "@prisma/client"
import { ICreateCompanyDTO } from "../dtos/ICreateCompanyDTO"

interface ICompanyRepository {
    create({name, cnpj, code}: ICreateCompanyDTO): Promise<Company>
    findById(id: string): Promise<Company>
    findByCNPJ(cnpj: string): Promise<Company>
    findAll(): Promise<Company[]>
    deleteById(id: string): Promise<Company>
}

export {ICompanyRepository}