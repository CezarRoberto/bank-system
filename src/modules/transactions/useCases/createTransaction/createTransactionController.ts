import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTransactionUseCase } from './createTransactionUseCase';


class CreateTransactionController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { client_id, amount, type } = await request.body;
        const createTransactionUseCase = container.resolve(CreateTransactionUseCase)
        const transaction = await createTransactionUseCase.execute({
            client_id,
            amount,
            type
        })

        return response.status(200).json(transaction)
    }
}

export { CreateTransactionController }