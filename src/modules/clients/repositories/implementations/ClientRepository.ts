import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { IUpdateClientDTO } from '@modules/clients/dtos/IUpdateClientDTO';
import { Client } from '@prisma/client';
import prismaClient from '@shared/infra/prisma';
import { Context } from '@shared/infra/prisma/context';
import { IClientRepository } from '../IClientRepository';

class ClientRepository implements IClientRepository {
    constructor(private readonly ctx: Context = { prisma: prismaClient }) {}
    async create({
        name,
        cpf,
        email,
        password,
        company_id,
        credits,
        amount,
    }: ICreateClientDTO): Promise<Client> {
        const client = await this.ctx.prisma.client.create({
            data: {
                name,
                cpf,
                password,
                email,
                company_id,
                credits,
                amount,
            },
        });
        return client;
    }

    async findById(id: string): Promise<Client | null> {
        const client = await this.ctx.prisma.client.findUnique({
            where: { id },
        });
        return client as Client;
    }

    async findAll(): Promise<Client[]> {
        const clients = await this.ctx.prisma.client.findMany();
        return clients;
    }

    async findByEmail(email: string): Promise<Client | null> {
        const client = await this.ctx.prisma.client.findFirst({
            where: { email },
        });

        return client as Client;
    }
    async findAllByBank(company_id: string): Promise<Client[]> {
        const clients = await this.ctx.prisma.client.findMany({
            where: { company_id },
        });

        return clients;
    }

    async deleteById(id: string): Promise<Client | null> {
        const client = await this.ctx.prisma.client.delete({
            where: { id },
        });

        return client;
    }

    async update({
        id,
        name,
        company_id,
        amount,
        cpf,
        credits,
        email,
        password,
    }: IUpdateClientDTO): Promise<Client> {
        const clientUpdated = await this.ctx.prisma.client.update({
            where: { id },
            data: {
                name,
                email,
                amount,
                company_id,
                cpf,
                credits,
                password,
            },
        });

        return clientUpdated;
    }

    async findByCPF(cpf: string): Promise<Client | null> {
        const client = await this.ctx.prisma.client.findFirst({
            where: { cpf },
        });

        return client;
    }
}

export { ClientRepository };
