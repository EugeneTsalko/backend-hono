import { type User } from '@prisma/client';
import { type z } from 'zod';
import { type schemaRole } from './userSchema';

export type UserBodyType = Omit<User, 'id'>;
export type UserRoleType = z.infer<typeof schemaRole>;

export type SignUpDataType = Omit<UserBodyType, 'role'>;
export type JwtPayloadType = Omit<User, 'login' | 'role' | 'password'>;
