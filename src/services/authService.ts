import { sign } from 'hono/jwt';
import { userRepository } from '../dataAcces/userRepository';
import { DbError, ValidationError } from '../errors/errors';
import bcrypt from 'bcrypt';
import { userService } from './userService';
import { type SignUpDataType } from '../models/userModel';

export const authService = {
  async generateTokens({ id, email }: Record<string, unknown>) {
    if (!process.env.JWT_ACCESS_SECRET) {
      throw Error('You need JWT_ACCESS_SECRET environmental variable.');
    }

    const accessToken = await sign(
      { id, email },
      process.env.JWT_ACCESS_SECRET
    ); // expired?

    return accessToken;
  },

  async signUp(user: SignUpDataType) {
    const { login, email, password } = user;
    const newUser = await userService.create({
      login,
      email,
      password,
      role: 'USER',
    });

    return newUser;
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

    const token = await this.generateTokens({ id, email });

    return { token, user: existingUser };
  },
};
