import { CreateCompanyController } from '@modules/companies/useCases/createCompany/createCompanyController';
import { Router } from 'express';

const companiesRouter = Router();

const createCompanyController = new CreateCompanyController();

companiesRouter.post('/', createCompanyController.handle)

export {companiesRouter}