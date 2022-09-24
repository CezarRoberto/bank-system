import { Client } from '@prisma/client';
import { ICreateClientDTO } from '../dtos/ICreateClientDTO';
import { IUpdateClientDTO } from '../dtos/IUpdateClientDTO';

interface IClientRepository {
    create({
        name,
        cpf,
        email,
        password,
        company_id,
        credits,
        amount,
    }: ICreateClientDTO): Promise<Client>;
    findById(id: string): Promise<Client | null>;
    findAll(): Promise<Client[]>;
    findByEmail(email: string): Promise<Client | null>;
    findByCPF(cpf: string): Promise<Client | null>;
    deleteById(id: string): Promise<Client | null>;
    findAllByBank(company_id: string): Promise<Client[]>;
    update: (params: IUpdateClientDTO) => Promise<Client>;
}

export { IClientRepository };
