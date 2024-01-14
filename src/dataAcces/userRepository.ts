import { PrismaClient } from '@prisma/client';
import { DbError } from '../errors/errors';
import { type UserType, type UserBodyType } from '../models/userModel';

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

  async getByLoginOrEmail({ email, login }: Record<string, string>) {
    const users = await prisma.user.findMany({
      where: {
        OR: [{ login }, { email }],
      },
    });

    return users;
  },

  async create(user: UserBodyType) {
    const { login, email, password, role, image } = user;

    const newUser = await prisma.user.create({
      data: { login, email, password, role, image },
    });

    return newUser;
  },

  async update(user: UserType) {
    const { id, login, email, password, role, image } = user;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { login, email, password, role, image },
    });

    return updatedUser;
  },

  async delete(id: number) {
    await this.getById(id);
    const user = await prisma.user.delete({
      where: { id },
    });

    return user;
  },
};
