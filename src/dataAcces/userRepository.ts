import { PrismaClient, type User } from '@prisma/client';
import { DbError } from '../errors/errors';
import { type UserBodyType } from '../models/userModel';

const prisma = new PrismaClient();

export const userRepository = {
  async getAll() {
    const dbResult = await prisma.user.findMany();

    return dbResult;
  },

  async getById(id: number) {
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

  async create(user: UserBodyType) {
    const { login, email, password } = user;

    const newUser = await prisma.user.create({
      data: { login, email, password },
    });

    return newUser;
  },

  async update(user: User) {
    const { id, login, email, password } = user;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { login, email, password },
    });

    return updatedUser;
  },

  async delete(id: number) {
    await this.getById(id);
    const user = await prisma.user.delete({
      where: { id },
    });

    if (!user) {
      throw new DbError(`User with ID: ${id} was not found`, 404);
    }

    return user;
  },
};
