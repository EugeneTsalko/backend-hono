import { Hono } from 'hono';
import { userRoutes } from './userRoutes';
import { postRoutes } from './postRoutes';
import { authRoutes } from './authRoutes';
import { docRoutes } from '../swagger';
import { commentRoutes } from './commentRoutes';

export const routes = new Hono();

routes.route('/', userRoutes);
routes.route('/', postRoutes);
routes.route('/', authRoutes);
routes.route('/', commentRoutes);
routes.route('/', docRoutes);
