import { ICreateClientDTO } from "@modules/clients/dtos/ICreateClientDTO";
import { Clients } from "@prisma/client";
import prismaClient from "@shared/infra/prisma";
import { IClientRepository } from "../IClientRepository";

class ClientRepository implements IClientRepository {
    async create({ name, cpf, email, password, company_id }: ICreateClientDTO): Promise<Clients> {
        const client = await prismaClient.clients.create({
            data: {
                name,
                cpf,
                email,
                password,
                company_id
            }
        })
        return client
    }

    async findAll(): Promise<Clients[]> {
        const clients = await prismaClient.clients.findMany();
        return clients
    }

    async findById(id: string): Promise<Clients> {
        const client = await prismaClient.clients.findFirst({
            where: {id}
        })

        return client as Clients
    }

    async deleteById(id: string): Promise<Clients> {
        const client = await prismaClient.clients.delete({
            where: {
                id
            }
        })

        return client as Clients
    }
}

export {ClientRepository}