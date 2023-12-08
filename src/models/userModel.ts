import { type z } from 'zod';
import { type schemaUser } from './userSchema';

export type UserBodyType = z.infer<typeof schemaUser>;
