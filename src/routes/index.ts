import { Hono } from 'hono';
import { userRoutes } from './userRoutes';

export const routes = new Hono();

routes.route('/', userRoutes);
