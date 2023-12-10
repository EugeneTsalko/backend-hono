import { Hono } from 'hono';
import { userController } from '../controllers/userController';
import { validateUser } from '../middleware/userValidation';
import { validateId } from '../middleware/idValidation';

export const userRoutes = new Hono().basePath('/users');

userRoutes.get('/', userController.findAll);

userRoutes.get('/:id', validateId, userController.findById);

userRoutes.post('/', validateUser, userController.create);

userRoutes.patch('/', validateUser, userController.update);

userRoutes.delete('/:id', validateId, userController.delete);
