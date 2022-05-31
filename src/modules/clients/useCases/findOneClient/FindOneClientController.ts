import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindOneClientUseCase } from './FindOneClientUseCase';


class FindOneClientController {
    async handle(request: Request, response: Response) {
        const {id} = request.params;
        const findOneClientUseCase = container.resolve(FindOneClientUseCase)

        const client = await findOneClientUseCase.execute(id)

        return response.status(200).json(client)
    }
}

export { FindOneClientController }