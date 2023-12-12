import { type User } from '@prisma/client';

export type UserBodyType = Omit<User, 'id'>;
