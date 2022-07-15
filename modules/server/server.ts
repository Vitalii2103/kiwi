import { ModuleDto } from "../index.dto";
import {VIEW_COMMANDS, VIEW_TEMPLATES} from "../view/view.dto";
import express, { Express, Request, Response } from 'express';
import {ReaderCommand} from "../reader/reader.dto";

const AppProvider = require('../../core/appProvider');
const facade = require('./facade')
const schema = require('./schema');
const rootValue = require('./rootValue');
const { graphqlHTTP } = require('express-graphql');

const app: Express = express();
const graphiql = true;

// GraphQL
app.use('/api', graphqlHTTP({ schema, rootValue, graphiql }));

// Render HTML form from CSV importing
app.get('/csv', async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  await AppProvider.facade('view').execute(VIEW_COMMANDS.RENDER, res, VIEW_TEMPLATES.CSV);
});

// Import CSV
app.post('/csv', async (req: Request, res: Response) => {
  const csv = await AppProvider.facade('reader').execute(ReaderCommand.CSV_FROM_STREAM, req);
  await AppProvider.facade('db').createEntries(csv);

  res.send('');
});

module.exports = {
  async initialize() {
    const port: Number = Number(process.env.SERVER_PORT) || 4000;
    const appServer = await app.listen(port);
    return facade(appServer);
  }
} as ModuleDto;
