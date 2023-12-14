import { validator } from 'hono/validator';
import { schemaEmail, schemaPassword } from '../models/userSchema';
import { ValidationError } from '../errors/errors';
import { type User } from '@prisma/client';

export const validateSignIn = validator('json', (value) => {
  const { email, password }: User = value;
  const parsedEmail = schemaEmail.safeParse(value.email);
  const parsedPassword = schemaPassword.safeParse(value.password);

  if (email && !parsedEmail.success) {
    throw new ValidationError('Email must be like mail@example.by');
  }

  if (password && !parsedPassword.success) {
    throw new ValidationError(
      'Password must include lowercase letter, uppercase letter, special character, digit and be minimum 8 characters length.'
    );
  }

  return { email, password };
});
