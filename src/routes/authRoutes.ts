import { Hono } from 'hono';
import { validateUser } from '../middleware/userValidation';
import { authController } from '../controllers/authController';

export const authRoutes = new Hono();

authRoutes.post('/signup', validateUser, authController.signUp);
authRoutes.post('/signin', (c) => c.text('signin'));
