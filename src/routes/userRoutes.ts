import { Hono } from 'hono';
import { userController } from '../controllers/userController';
import { validateUser, validateUserId } from '../middleware/userValidation';

export const userRoutes = new Hono().basePath('/users');

userRoutes.get('/', userController.findAll);

userRoutes.get('/:id', validateUserId, userController.findById);

userRoutes.post('/', validateUser, userController.create);

userRoutes.patch('/', validateUser, userController.update);

userRoutes.delete('/:id', validateUserId, userController.delete);
