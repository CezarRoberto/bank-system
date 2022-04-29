import { Router } from 'express';
import { clientsRouter } from './clients.router';
import { companiesRouter } from './companies.router';

const router = Router();

router.use('/companies', companiesRouter)
router.use('/clients', clientsRouter)

export { router };