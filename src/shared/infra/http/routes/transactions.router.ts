import { CreateTransactionController } from '@modules/transactions/useCases/createTransaction/createTransactionController';
import { DeleteTransactionController } from '@modules/transactions/useCases/deleteTransaction/deleteTransactionController';
import { FindTransactionsByClientController } from '@modules/transactions/useCases/findTransactionByClient/findTransactionByClientController';
import { Router } from 'express';
import { validateTransaction } from '../middlewares/validateTransaction';

const transactionsRouter = Router();

const createTransactionController = new CreateTransactionController();
const deleteTransactionController = new DeleteTransactionController();
const findTransactionsByClientController = new FindTransactionsByClientController();


transactionsRouter.post('/', validateTransaction, createTransactionController.handle);
transactionsRouter.get('/:id', findTransactionsByClientController.handle)
transactionsRouter.delete('/:id', deleteTransactionController.handle)

export { transactionsRouter }