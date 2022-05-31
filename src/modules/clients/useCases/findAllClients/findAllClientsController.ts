import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindAllClientsUseCase } from './findAllClientsUseCase';

class FindAllClientsController {
    async handle(request: Request, response: Response) {
        const findAllClientsUseCase = container.resolve(FindAllClientsUseCase)

        const clients = await findAllClientsUseCase.execute()

        return response.status(200).json(clients)
    }
}


export { FindAllClientsController }