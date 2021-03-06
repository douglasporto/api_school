import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('../api/swagger/openApiDocumentation');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    );
    this.server.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(openApiDocumentation)
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
