import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import StudentsController from './controllers/StudentsController';
import auth from './middlewares/auth';
import PlansController from './controllers/PlansController';
import Subscription from './controllers/SubscriptionController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Olá' }));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(auth);
routes.post('/students', StudentsController.store);

/**
 * Plans
 */
routes.get('/plans', PlansController.index);
routes.post('/plans', PlansController.store);
routes.put('/plans/:id', PlansController.update);

routes.post('/subscriptions', Subscription.store);

export default routes;
