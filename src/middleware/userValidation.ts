import { validator } from 'hono/validator';
import {
  schemaEmail,
  schemaImage,
  schemaLogin,
  schemaPassword,
  schemaRole,
} from '../models/userSchema';
import { ValidationError } from '../errors/errors';
import { type User } from '@prisma/client';

export const validateUser = validator('json', (value) => {
  const { id, login, email, password, role, image }: User = value;
  const parsedLogin = schemaLogin.safeParse(login);
  const parsedEmail = schemaEmail.safeParse(email);
  const parsedPassword = schemaPassword.safeParse(password);
  const parsedRole = schemaRole.safeParse(role);
  const parsedImage = schemaImage.safeParse(image);


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

  if (image && !parsedImage.success) {
    throw new ValidationError('User image must be Base64 string');
  }

  return { id, login, email, password, role, image };
});
