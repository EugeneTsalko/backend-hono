import { z } from 'zod';

export const schemaId = z.coerce.number().min(0);

export const schemaLogin = z.string().min(1);

export const schemaEmail = z.string().email();

export const schemaPassword = z
  .string()
  .min(8)
  .regex(/.*[`~<>?,.\\/!@#$%^&*()\-_+="'|{}[\];:\\].*/, 'One special character')
  .regex(/.*[a-z].*/, 'One lowercase character')
  .regex(/.*[A-Z].*/, 'One uppercase character');

export const schemaUser = z.object({
  login: schemaLogin,
  email: schemaEmail,
  password: schemaPassword,
});
