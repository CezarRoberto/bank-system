import { Router } from 'express';
import { companiesRouter } from './companies.router';

const router = Router();

router.use('/companies', companiesRouter)

export { router };