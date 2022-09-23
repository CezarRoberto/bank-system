import { Company } from "@prisma/client"
import { ICreateCompanyDTO } from "../dtos/ICreateCompanyDTO"

interface ICompanyRepository {
    create({name, cnpj, code}: ICreateCompanyDTO): Promise<Company>
    findById(id: string): Promise<Company | null>
    findByCNPJ(cnpj: string): Promise<Company | null>
    findAll(): Promise<Company[]>
    deleteById(id: string): Promise<Company>
}

export {ICompanyRepository}