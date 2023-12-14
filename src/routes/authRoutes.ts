import { Hono } from 'hono';
import { validateUser } from '../middleware/userValidation';
import { authController } from '../controllers/authController';
import { validateSignIn } from '../middleware/authValidation';

export const authRoutes = new Hono();

authRoutes.post('/signup', validateUser, authController.signUp);
authRoutes.post('/signin', validateSignIn, authController.signIn);
