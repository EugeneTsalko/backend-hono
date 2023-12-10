import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { routes } from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandling';

const app = new Hono();
app.route('/', routes);

app.onError(errorHandler);

app.notFound(notFoundHandler);

serve(app);
