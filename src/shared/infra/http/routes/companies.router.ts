import { CreateCompanyController } from '@modules/companies/useCases/createCompany/createCompanyController';
import { DeleteCompanyController } from '@modules/companies/useCases/deleteCompany/deleteCompanyController';
import { FindAllCompaniesController } from '@modules/companies/useCases/findAllCompanies/findAllCompanyUseCase';
import { FindOneCompanyController } from '@modules/companies/useCases/findOneCompany/findOneCompanyController';
import { Router } from 'express';

const companiesRouter = Router();

const createCompanyController = new CreateCompanyController();
const findAllCompaniesController = new FindAllCompaniesController();
const findOneCompanyController = new FindOneCompanyController();
const deleteCompanyController = new DeleteCompanyController()

companiesRouter.post('/', createCompanyController.handle);
companiesRouter.get('/all', findAllCompaniesController.handle)
companiesRouter.get('/:id', findOneCompanyController.handle);
companiesRouter.delete('/:id', deleteCompanyController.handle)

export {companiesRouter}