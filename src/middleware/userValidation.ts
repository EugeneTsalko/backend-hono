import { validator } from 'hono/validator';
import {
  schemaEmail,
  schemaId,
  schemaLogin,
  schemaPassword,
} from '../models/userSchema';
import { ValidationError } from '../errors/errors';
import { type User } from '@prisma/client';

export const validateUserId = validator('param', (value: { id: string }) => {
  const parsedId = schemaId.safeParse(value.id);

  if (!parsedId.success) {
    throw new ValidationError('ID must be a number');
  }
  return { id: parsedId.data };
});

export const validateUser = validator('json', (value) => {
  const { id, login, email, password }: User = value;
  const parsedLogin = schemaLogin.safeParse(value.login);
  const parsedEmail = schemaEmail.safeParse(value.email);
  const parsedPassword = schemaPassword.safeParse(value.password);

  if (login && !parsedLogin.success) {
    throw new ValidationError('Login must be non-empty string');
  }

  if (email && !parsedEmail.success) {
    throw new ValidationError('Email must be like mail@example.by');
  }

  if (password && !parsedPassword.success) {
    throw new ValidationError(
      'Password must include lowercase letter, uppercase letter, special character, digit and be minimum 8 characters length.'
    );
  }

  return { id, login, email, password };
});
