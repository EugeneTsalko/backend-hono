import { z } from 'zod';

export const schemaLogin = z.string().min(1);

export const schemaEmail = z.string().email();

export const schemaPassword = z
  .string()
  .min(8)
  .regex(/.*[`~<>?,.\\/!@#$%^&*()\-_+="'|{}[\];:\\].*/, 'One special character')
  .regex(/.*[a-z].*/, 'One lowercase character')
  .regex(/.*[A-Z].*/, 'One uppercase character')
  .regex(/.*[0-9].*/, 'One digit');
