import { ICreateTransactionDTO } from "@modules/transactions/dtos/ICreateTransactionsDTO";
import { Transactions,  } from "@prisma/client";
import prismaClient from "@shared/infra/prisma";
import { Context } from "@shared/infra/prisma/context";
import { ITransactionRepository } from "../ITransactionRepository";

class TransactionRepository implements ITransactionRepository {
    constructor(private readonly ctx: Context = {prisma: prismaClient}) {}
    async create({ client_id, amount, type }: ICreateTransactionDTO): Promise<Transactions> {
        const transaction = await this.ctx.prisma.transactions.create({
            data: {
                client_id,
                amount,
                type
            }
        })

        if (transaction.type == "DEPOSIT") {
            await this.ctx.prisma.$transaction([
                this.ctx.prisma.client.update({
                    where: {
                        id: transaction.client_id
                    },
                    data: {
                        amount: {
                            increment: amount
                        }
                    }
                })
            ])
        }

        if (transaction.type == "WITHDRAW") {
            await this.ctx.prisma.$transaction([
                this.ctx.prisma.client.update({
                    where: {
                        id: transaction.client_id
                    },
                    data: {
                        amount: {
                            decrement: amount 
                        }
                    }
                })
            ])
    }
    return transaction
}

    async findByClient(client_id: string): Promise<Transactions[]> {
        const transactions = await this.ctx.prisma.transactions.findMany({
            where: { client_id }
        })

        return transactions
    }

    async findById(id: string): Promise<Transactions | null> {
        const transactions = await this.ctx.prisma.transactions.findFirst({
            where: { id }
        })

        return transactions
    }

    async deleteTransaction(id: string): Promise<Transactions> {
        const deletedTransaction = await this.ctx.prisma.transactions.delete({
            where: { id }
        })

        if (deletedTransaction.type == "DEPOSIT") {
            await this.ctx.prisma.$transaction([
                this.ctx.prisma.client.update({
                    where: {
                        id: deletedTransaction.client_id
                    },
                    data: {
                        amount: {
                            decrement: deletedTransaction.amount
                        }
                    }
                })
            ])
        }

        if (deletedTransaction.type == "WITHDRAW") {
            await this.ctx.prisma.$transaction([
                this.ctx.prisma.client.update({
                    where: {
                        id: deletedTransaction.client_id
                    },
                    data: {
                        amount: {
                            increment: deletedTransaction.amount
                        }
                    }
                })
            ])
    }

        return deletedTransaction
    }
}

export { TransactionRepository }