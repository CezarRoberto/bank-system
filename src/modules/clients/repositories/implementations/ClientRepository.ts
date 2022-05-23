
import { ICreateClientDTO } from "@modules/clients/dtos/ICreateClientDTO";
import { Client } from "@prisma/client";
import prismaClient from "@shared/infra/prisma";
import { IClientRepository } from "../IClientRepository";

class ClientRepository implements IClientRepository {
    async create({ name, cpf, email, password, company_id }: ICreateClientDTO): Promise<Client> {
        const client = await prismaClient.client.create({
            data: {
                name,
                cpf,
                password,
                email,
                company_id
            }
        })
        return client
    }

    async findById(id: string): Promise<Client> {
        const client = await prismaClient.client.findUnique({
            where: {id}
        })
        return client as Client
    }

    async findAll(): Promise<Client[]> {
        const clients = await prismaClient.client.findMany()
        return clients
    }

    async findByEmail(email: string): Promise<Client> {
        const client = await prismaClient.client.findFirst({
            where: {email}
        })

        return client as Client
    }
    async findByBank(company_id: string): Promise<Client> {
        const client = await prismaClient.client.findFirst({
            where: {company_id}
        })

        return client as Client
    }
    async deleteById(id: string): Promise<Client> {
        const client = await prismaClient.client.delete({
            where: {id}
        })

        return client
    }

}

export {ClientRepository}