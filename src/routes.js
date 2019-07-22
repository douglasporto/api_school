import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import NotificationsController from './app/controllers/NotificationsController';
import SchoolController from './app/controllers/SchoolController';

const routes = new Router();
const uploads = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.get('/notifications', NotificationsController.index);
routes.put('/notifications/:id', NotificationsController.update);

routes.post('/files', uploads.single('file'), FileController.store);

routes.get('/schools', SchoolController.index);
routes.post('/schools', SchoolController.store);

export default routes;
