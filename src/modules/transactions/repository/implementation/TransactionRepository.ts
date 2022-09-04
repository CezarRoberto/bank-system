import { ICreateTransactionDTO } from "@modules/transactions/dto/ICreateTransactionsDTO";
import { Transactions,  } from "@prisma/client";
import prismaClient from "@shared/infra/prisma";
import { ITransactionRepository } from "../ITransactionRepository";

class TransactionRepository implements ITransactionRepository {
    async create({ client_id, amount, type }: ICreateTransactionDTO): Promise<Transactions> {
        const transaction = await prismaClient.transactions.create({
            data: {
                client_id,
                amount,
                type
            }
        })

        if (transaction.type == "DEPOSIT") {
            await prismaClient.$transaction([
                prismaClient.client.update({
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
            await prismaClient.$transaction([
                prismaClient.client.update({
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
        const transactions = await prismaClient.transactions.findMany({
            where: { client_id }
        })

        return transactions
    }

    async findById(id: string): Promise<Transactions | null> {
        const transactions = await prismaClient.transactions.findFirst({
            where: { id }
        })

        return transactions
    }

    async deleteTransaction(id: string): Promise<Transactions> {
        const deletedTransaction = await prismaClient.transactions.delete({
            where: { id }
        })

        if (deletedTransaction.type == "DEPOSIT") {
            await prismaClient.$transaction([
                prismaClient.client.update({
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
            await prismaClient.$transaction([
                prismaClient.client.update({
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