import { type User } from '@prisma/client';
import { type z } from 'zod';
import { type schemaRole } from './userSchema';

export type UserType = User;

export type UserBodyType = Omit<UserType, 'id'>;
export type UserRoleType = z.infer<typeof schemaRole>;

export type SignUpDataType = Omit<UserBodyType, 'role'>;
export type JwtPayloadType = Omit<UserType, 'login' | 'role' | 'password'>;
