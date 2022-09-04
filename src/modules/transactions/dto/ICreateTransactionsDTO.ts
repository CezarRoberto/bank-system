import { TransactionType } from "@prisma/client"

interface ICreateTransactionDTO {
    client_id: string
    amount: number
    type: TransactionType
}

export {ICreateTransactionDTO}