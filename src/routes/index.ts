import { Hono } from 'hono';
import { userRoutes } from './userRoutes';
import { postRoutes } from './postRoutes';
import { authRoutes } from './authRoutes';
import { docRoutes } from '../swagger/swagger';

export const routes = new Hono();

routes.route('/', userRoutes);
routes.route('/', postRoutes);
routes.route('/', authRoutes);
routes.route('/', docRoutes);
