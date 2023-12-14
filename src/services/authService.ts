import { sign } from 'hono/jwt';
import { authRepository } from '../dataAcces/authRepository';

export const authService = {
  async generateTokens({ id, email }: Record<string, unknown>) {
    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
      throw Error(
        'You need JWT_ACCESS_SECRET and JWT_REFRESH_SECRET environmental variables.'
      );
    }

    const accessToken = await sign(
      { id, email },
      process.env.JWT_ACCESS_SECRET
    ); // expired?
    const refreshToken = await sign(
      { id, email },
      process.env.JWT_REFRESH_SECRET
    );

    return { accessToken, refreshToken };
  },

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await authRepository.getByUserId(userId);

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await authRepository.update(tokenData);
    }

    const token = await authRepository.create({ userId, refreshToken });

    return token;
  },
};
