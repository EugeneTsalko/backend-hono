import { PrismaClient, type Token } from '@prisma/client';

const prisma = new PrismaClient();

export const authRepository = {
  async getByUserId(userId: number) {
    const token = await prisma.token.findUnique({
      where: { userId },
    });

    return token;
  },

  async create(token: Token) {
    const { userId, refreshToken } = token;

    const newToken = await prisma.token.create({
      data: { userId, refreshToken },
    });

    return newToken;
  },

  async update(token: Token) {
    const { userId, refreshToken } = token;

    const updatedToken = await prisma.token.update({
      where: { userId },
      data: { refreshToken },
    });

    return updatedToken;
  },
};
