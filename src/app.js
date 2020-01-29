import express from 'express';
import routes from './app/routes';
import Database from './database';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';

const app = express();

Sentry.init(sentryConfig);
app.use(Sentry.Handlers.requestHandler());

app.use(express.json());
app.use(routes);

app.use(Sentry.Handlers.errorHandler());

app.listen(3333);
