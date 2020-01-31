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

if (process.env.NODE_ENV === 'production') {
  app.use(Sentry.Handlers.errorHandler());
  console.log('enviando erro');
}
app.use(async (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    const error = await new Youch(err, res).toJSON();
    return res.json(error);
    console.log('enviando erro dife');
  }
  return res
    .status(err.status || 500)
    .json({ error: { message: 'Internal server error' } });
});

app.listen(3333);
