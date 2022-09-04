import { Transactions } from "@prisma/client"
import { ICreateTransactionDTO } from "../dto/ICreateTransactionsDTO"

interface ITransactionRepository {
    create({client_id, amount, type}: ICreateTransactionDTO): Promise<Transactions>
    findByClient(client_id: string): Promise<Transactions[]>
    deleteTransaction(id: string): Promise<Transactions>
    findById(id: string): Promise<Transactions | null>
}


export { ITransactionRepository }