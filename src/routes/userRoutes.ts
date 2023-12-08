import { Hono } from 'hono';
import { userController } from '../controllers/userController';
import { validateUser, validateUserId } from '../middleware/userValidation';

export const userRoutes = new Hono().basePath('/users');

userRoutes.get('/', userController.findAllUsers);

userRoutes.get('/:id', validateUserId, userController.findUserById);

userRoutes.post('/', validateUser, userController.createUser);

userRoutes.patch('/', validateUser, userController.updateUser);

userRoutes.delete('/:id', validateUserId, userController.deleteUser);
