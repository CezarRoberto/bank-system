import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GoogleSignInUseCase } from './GoogleSignInUseCase';

class GoogleSignInController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token,
            cpf,
            company_id,
            credits,
            amount, } =
            request.body;
        const googleSignInUseCase = container.resolve(GoogleSignInUseCase);

        const client = await googleSignInUseCase.execute({
            token,
            cpf,
            company_id,
            credits,
            amount,
        });

        return response.status(200).json(client);
    }
}

export { GoogleSignInController };
