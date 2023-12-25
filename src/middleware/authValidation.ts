import { validator } from 'hono/validator';
import { schemaEmail, schemaLogin, schemaPassword } from '../models/userSchema';
import { ValidationError } from '../errors/errors';
import { type User } from '@prisma/client';
import { type Context, type Next } from 'hono';
import { userRepository } from '../dataAcces/userRepository';
import { type JwtPayloadType } from '../models/userModel';

export const validateSignIn = validator('json', (value) => {
  const { email, password }: User = value;
  const parsedEmail = schemaEmail.safeParse(email);
  const parsedPassword = schemaPassword.safeParse(password);

  if (!parsedEmail.success) {
    throw new ValidationError('Email must be like mail@example.by');
  }

  if (!parsedPassword.success) {
    throw new ValidationError(
      'Password must include lowercase letter, uppercase letter, special character, digit and be minimum 8 characters length.'
    );
  }

  return { email, password };
});

export const validateSignUp = validator('json', (value) => {
  const { login, email, password }: User = value;
  const parsedLogin = schemaLogin.safeParse(login);
  const parsedEmail = schemaEmail.safeParse(email);
  const parsedPassword = schemaPassword.safeParse(password);

  if (!parsedLogin.success) {
    throw new ValidationError('Login must be non-empty string');
  }

  if (!parsedEmail.success) {
    throw new ValidationError('Email must be like mail@example.by');
  }

  if (!parsedPassword.success) {
    throw new ValidationError(
      'Password must include lowercase letter, uppercase letter, special character, digit and be minimum 8 characters length.'
    );
  }

  return { login, email, password };
});

export const isAdmin = async (c: Context, next: Next): Promise<void> => {
  const payload: JwtPayloadType = c.get('jwtPayload');

  if (!payload) {
    throw new ValidationError('Token Error.');
  }

  const user = (
    await userRepository.getByLoginOrEmail({ email: payload.email })
  )[0];

  if (user.role !== 'ADMIN') {
    throw new ValidationError('You do not have authorization for this action');
  }

  await next();
};

export const isSignedIn = async (c: Context, next: Next): Promise<void> => {
  const payload: JwtPayloadType = c.get('jwtPayload');

  if (!payload) {
    throw new ValidationError('Token Error.');
  }

  const user = (
    await userRepository.getByLoginOrEmail({ email: payload.email })
  )[0];

  if (!user) {
    throw new ValidationError('You are not authenticated.');
  }

  await next();
};
