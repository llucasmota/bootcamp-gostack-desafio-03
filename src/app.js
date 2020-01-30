require('dotenv').config();
import express from 'express';
import 'express-async-errors';
import routes from './app/routes';
import Database from './database';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';

const app = express();
/**
 * Inicialização do Sentry com configs e Handling
 */
Sentry.init(sentryConfig);
app.use(Sentry.Handlers.requestHandler());
/**
 * Config rotas
 */

app.use(express.json());
app.use(routes);

app.use(async (err, req, res, next) => {
  const error = await new Youch(err, res).toJSON();

  return res.status(500).json(error);
});

app.use(Sentry.Handlers.errorHandler());

app.listen(3333);
