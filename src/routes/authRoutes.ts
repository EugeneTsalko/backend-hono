import { Hono } from 'hono';
import { authController } from '../controllers/authController';
import { validateSignIn, validateSignUp } from '../middleware/authValidation';

export const authRoutes = new Hono();

authRoutes.post('/signup', validateSignUp, authController.signUp);

authRoutes.post('/signin', validateSignIn, authController.signIn);
