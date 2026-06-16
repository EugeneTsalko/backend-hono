import { validator } from 'hono/validator';
import { ValidationError } from '../errors/errors';
import { schemaId } from '../models/idSchema';

export const validateId = validator('param', (value: { id: string }) => {
  const parsedId = schemaId.safeParse(value.id);

  if (!parsedId.success) {
    throw new ValidationError('ID must be a number');
  }
  return { id: parsedId.data };
});
