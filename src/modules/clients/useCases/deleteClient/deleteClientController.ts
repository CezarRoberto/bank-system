import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteClientUseCase } from './deleteClientUseCase';


class DeleteClientController {
    async handle(request: Request, response: Response) {
        const {id} = request.params;
        const deleteClientUseCase = container.resolve(DeleteClientUseCase)

        const client = await deleteClientUseCase.execute(id)

        return response.status(200).json({"message": "deleted"})

    }
}

export { DeleteClientController}