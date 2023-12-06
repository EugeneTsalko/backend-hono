import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { routes } from './routes';

const app = new Hono();
app.route('/', routes);

serve(app);
