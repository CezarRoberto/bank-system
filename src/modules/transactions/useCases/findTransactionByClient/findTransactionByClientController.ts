import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindTransactionByClientUseCase } from './findTransactionByClientUseCase';

class FindTransactionsByClientController {
    async handle(request: Request, response: Response) {
        const { client_id } = request.params;

        const findTransactionsByClientUseCase = container.resolve(FindTransactionByClientUseCase)

        const transactions = await findTransactionsByClientUseCase.execute(client_id)

        return response.status(200).json(transactions)
    }
}

export { FindTransactionsByClientController }