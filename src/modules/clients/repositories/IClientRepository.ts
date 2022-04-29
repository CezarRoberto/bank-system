import { Clients } from "@prisma/client"
import { ICreateClientDTO } from "../dtos/ICreateClientDTO"

interface IClientRepository {
    create({name, cpf, email, password, company_id}: ICreateClientDTO): Promise<Clients>
    findById(id: string): Promise<Clients>
    deleteById(id: string): Promise<Clients>
    findAll(): Promise<Clients[]>
    
}

export {IClientRepository}