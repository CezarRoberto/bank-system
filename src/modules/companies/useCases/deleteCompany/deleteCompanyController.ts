import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCompanyUseCase } from "./deleteCompanyUseCase";

class DeleteCompanyController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const deleteOneCompanyUseCase = container.resolve(DeleteCompanyUseCase)

        const company = await deleteOneCompanyUseCase.execute({ id })

        return response.status(200).json({ "message": "Deleted" })
    }
}

export { DeleteCompanyController }