import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindAllClientsByBankUseCase } from './findClientsByBankUseCase';

class FindClientsByBankController {
    async handle(request: Request, response: Response) {
        const {company_id} = request.params;
        const findAllClientsByBankUseCase = container.resolve(FindAllClientsByBankUseCase)

        const clients = await findAllClientsByBankUseCase.execute(company_id)

        return response.status(200).json(clients)
    }
}

export { FindClientsByBankController}