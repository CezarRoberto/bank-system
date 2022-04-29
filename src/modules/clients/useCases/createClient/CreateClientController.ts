import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateClientUseCase } from './CreateClientUseCase';

class CreateClientController {
    async handle(request: Request, response: Response) {
        const {name, cpf, email, password} = request.body;
        const createClientUseCase = container.resolve(CreateClientUseCase)

        const client = await createClientUseCase.execute({
            name,
            cpf,
            email,
            password
        })

        return response.status(200).json(client)
    }
}

export {CreateClientController}