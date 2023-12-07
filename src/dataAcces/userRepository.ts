import { PrismaClient, type User } from '@prisma/client';
import { DbError } from '../errors/errors';
import { type IUser } from '../models/userModel';

const prisma = new PrismaClient();

export const userRepository = {
  async getAll(): Promise<User[]> {
    const dbResult = await prisma.user.findMany();

    return dbResult;
  },

  async getById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new DbError(`User with ID: ${id} was not found`, 404);
    }

    return user;
  },

  async getByLoginOrEmail(login: string, email: string) {
    const users = await prisma.user.findMany({
      where: {
        OR: [{ login }, { email }],
      },
    });

    if (users.length > 0) {
      throw new DbError(`User with same login or email is already exists`, 409);
    }

    return users;
  },

  async postUser(user: IUser) {
    const { login, email, password } = user;

    const newUser = await prisma.user.create({
      data: { login, email, password },
    });

    return newUser;
  },

  async patchUser(user: User) {
    const { id, login, email, password } = user;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { login, email, password },
    });

    return updatedUser;
  },
};
