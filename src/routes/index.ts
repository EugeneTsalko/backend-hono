import { Hono } from 'hono';
import { userRoutes } from './userRoutes';
import { postRoutes } from './postRoutes';
import { authRoutes } from './authRoutes';

export const routes = new Hono();

routes.route('/', userRoutes);
routes.route('/', postRoutes);
routes.route('/', authRoutes);
