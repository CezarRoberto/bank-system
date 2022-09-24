import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateClientUseCase } from './CreateClientUseCase';

class CreateClientController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, cpf, email, password, company_id, credits, amount } =
            request.body;
        const createClientUseCase = container.resolve(CreateClientUseCase);

        const client = await createClientUseCase.execute({
            name,
            cpf,
            email,
            password,
            company_id,
            credits,
            amount,
        });

        return response.status(200).json(client);
    }
}

export { CreateClientController };
