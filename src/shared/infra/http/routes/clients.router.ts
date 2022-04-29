import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { Router } from 'express';

const clientsRouter = Router();

const createClientController = new CreateClientController();

clientsRouter.post('/', createClientController.handle)

export {clientsRouter}