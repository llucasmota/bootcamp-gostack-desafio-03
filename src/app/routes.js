import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import StudentsController from './controllers/StudentsController';
import auth from './middlewares/auth';
import PlansController from './controllers/PlansController';
import Subscription from './controllers/SubscriptionController';
import SubscriptionController from './controllers/SubscriptionController';
import CheckinController from './controllers/CheckinController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Olá' }));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/checkins', CheckinController.store);

routes.use(auth);
routes.post('/students', StudentsController.store);

/**
 * Plans
 */
routes.get('/plans', PlansController.index);
routes.post('/plans', PlansController.store);
routes.put('/plans/:id', PlansController.update);

routes.post('/subscriptions', Subscription.store);
routes.get('/subscriptions', SubscriptionController.index);
routes.put('/subscriptions/:id', SubscriptionController.update);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

export default routes;
