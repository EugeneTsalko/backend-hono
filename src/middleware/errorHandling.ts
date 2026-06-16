import { type Context } from 'hono';
import { DbError, ValidationError } from '../errors/errors';

export const errorHandler = (err: Error, c: Context): Response => {
  if (err instanceof DbError) {
    return c.json({ ok: false, message: err.message }, err.code);
  }

  if (err instanceof ValidationError) {
    return c.json({ ok: false, message: err.message }, 400);
  }
  return c.json({ ok: false, message: err.message }, 500);
};

export const notFoundHandler = (c: Context): Response => {
  return c.json({ ok: false, message: 'Oops, not found.' }, 404);
};
