import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import StudentsController from './controllers/StudentsController';
import auth from './middlewares/auth';
import uuidValidate from './middlewares/validUUID';
import PlansController from './controllers/PlansController';
import Subscription from './controllers/SubscriptionController';
import SubscriptionController from './controllers/SubscriptionController';
import CheckinController from './controllers/CheckinController';
import HelpOrdersController from './controllers/HelpOrdersController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Olá' }));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.post('/students/:id/checkins', uuidValidate, CheckinController.store);
routes.post(
  '/students/:id/help-orders',
  uuidValidate,
  HelpOrdersController.store
);
routes.get(
  '/students/:id/help-orders',
  uuidValidate,
  HelpOrdersController.index
);
routes.put(
  '/help-orders/:id/answer',
  uuidValidate,
  HelpOrdersController.update
);

routes.use(auth);
routes.post('/students', StudentsController.store);

/**
 * Plans
 */
routes.get('/plans', PlansController.index);
routes.post('/plans', PlansController.store);
routes.put('/plans/:id', uuidValidate, PlansController.update);
/**
 * Subscription
 */
routes.post('/subscriptions', Subscription.store);
routes.get('/subscriptions', SubscriptionController.index);
routes.put('/subscriptions/:id', uuidValidate, SubscriptionController.update);
routes.delete(
  '/subscriptions/:id',
  uuidValidate,
  SubscriptionController.delete
);

routes.get('/students/:id/checkins', uuidValidate, CheckinController.index);

export default routes;
