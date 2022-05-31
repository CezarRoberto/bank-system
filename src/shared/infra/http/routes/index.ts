import { Router } from 'express';
import { clientsRouter } from './clients.router';
import { companiesRouter } from './companies.router';
import { transactionsRouter } from './transactions.router';

const router = Router();

router.use('/companies', companiesRouter)
router.use('/clients', clientsRouter)
router.use('/transactions', transactionsRouter)

export { router };