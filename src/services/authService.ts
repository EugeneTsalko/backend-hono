import { sign } from 'hono/jwt';
import { authRepository } from '../dataAcces/authRepository';
import { userRepository } from '../dataAcces/userRepository';
import { DbError, ValidationError } from '../errors/errors';
import bcrypt from 'bcrypt';
import { type User } from '@prisma/client';
import { userService } from './userService';

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

  async signUp(user: User) {
    const { login, email, password } = user;
    const newUser = await userService.create({
      login,
      email,
      password,
      role: 'USER',
    });

    const tokens = await this.generateTokens({ id: newUser.id, email });
    await this.saveToken(newUser.id, tokens.refreshToken);

    return { ...tokens, user: newUser };
  },

  async signIn({ email, password }: Record<string, string>) {
    const existingUser = (await userRepository.getByLoginOrEmail({ email })).at(
      0
    );

    if (!existingUser) {
      throw new DbError(`User with email ${email} was not found.`, 404);
    }

    const isPassEquals = await bcrypt.compare(password, existingUser.password);

    if (!isPassEquals) {
      throw new ValidationError(`Incorrect password.`);
    }

    const id = existingUser.id;

    const tokens = await this.generateTokens({ id, email });
    await this.saveToken(id, tokens.refreshToken);

    return { ...tokens, user: existingUser };
  },
};
