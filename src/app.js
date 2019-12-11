import express from 'express';
import routes from './app/routes';
import Database from './database';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);
