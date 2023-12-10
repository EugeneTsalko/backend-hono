import { Hono } from 'hono';
import { userRoutes } from './userRoutes';
import { postRoutes } from './postRoutes';

export const routes = new Hono();

routes.route('/', userRoutes);
routes.route('/', postRoutes);
