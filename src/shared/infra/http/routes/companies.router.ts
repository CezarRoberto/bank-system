import { CreateCompanyController } from '@modules/companies/useCases/createCompany/createCompanyController';
import { DeleteCompanyController } from '@modules/companies/useCases/deleteCompany/deleteCompanyController';
import { FindAllCompaniesController } from '@modules/companies/useCases/findAllCompanies/findAllCompanyController';
import { FindOneCompanyController } from '@modules/companies/useCases/findOneCompany/findOneCompanyController';
import { Router } from 'express';
import { validateCompany } from '../middlewares/validateCompany';

const companiesRouter = Router();

const createCompanyController = new CreateCompanyController();
const findAllCompaniesController = new FindAllCompaniesController();
const findOneCompanyController = new FindOneCompanyController();
const deleteCompanyController = new DeleteCompanyController()

companiesRouter.post('/', validateCompany, createCompanyController.handle);
companiesRouter.get('/all', findAllCompaniesController.handle)
companiesRouter.get('/:id', findOneCompanyController.handle);
companiesRouter.delete('/:id', deleteCompanyController.handle)

export { companiesRouter }