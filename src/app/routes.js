import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import StudentsController from './controllers/StudentsController';
import auth from './middlewares/auth';
import PlansController from './controllers/PlansController';
import Subscription from './controllers/SubscriptionController';
import SubscriptionController from './controllers/SubscriptionController';
import CheckinController from './controllers/CheckinController';
import HelpOrdersController from './controllers/HelpOrdersController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Olá' }));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.post('/students/:id/checkins', CheckinController.store);
routes.post('/students/:id/help-orders', HelpOrdersController.store);

routes.use(auth);
routes.post('/students', StudentsController.store);

/**
 * Plans
 */
routes.get('/plans', PlansController.index);
routes.post('/plans', PlansController.store);
routes.put('/plans/:id', PlansController.update);
/**
 * Subscription
 */
routes.post('/subscriptions', Subscription.store);
routes.get('/subscriptions', SubscriptionController.index);
routes.put('/subscriptions/:id', SubscriptionController.update);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

routes.get('/students/:id/checkins', CheckinController.index);

export default routes;
