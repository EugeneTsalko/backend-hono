import { validator } from 'hono/validator';
import {
  schemaEmail,
  schemaLogin,
  schemaPassword,
  schemaRole,
} from '../models/userSchema';
import { ValidationError } from '../errors/errors';
import { type User } from '@prisma/client';

export const validateUser = validator('json', (value) => {
  const { id, login, email, password, role }: User = value;
  const parsedLogin = schemaLogin.safeParse(value.login);
  const parsedEmail = schemaEmail.safeParse(value.email);
  const parsedPassword = schemaPassword.safeParse(value.password);
  const parsedRole = schemaRole.safeParse(value.role);

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

  if (role && !parsedRole.success) {
    throw new ValidationError('User role must be USER or ADMIN');
  }

  return { id, login, email, password, role };
});
