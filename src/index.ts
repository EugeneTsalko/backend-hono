import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { routes } from './routes';
import { DbError, ValidationError } from './errors/errors';

const app = new Hono();
app.route('/', routes);

app.onError((err, c) => {
  if (err instanceof DbError) {
    return c.json({ ok: false, message: err.message }, err.code);
  }

  if (err instanceof ValidationError) {
    return c.json({ ok: false, message: err.message }, 400);
  }
  return c.json({ ok: false, message: err.message }, 500);
});

app.notFound((c) => {
  return c.json({ ok: false, message: 'Oops, not found.' }, 404);
});

serve(app);
