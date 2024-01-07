import { sign } from 'hono/jwt';
import { userRepository } from '../dataAcces/userRepository';
import { DbError, ValidationError } from '../errors/errors';
import bcrypt from 'bcrypt';
import { userService } from './userService';
import { type ISignUpData } from '../models/userModel';
import { fileService } from './fileService';

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

  async signUp(user: ISignUpData) {
    const { login, email, password, image } = user;

    const dir = `./upload/user/${login}/avatar`;
    const pathToImage = await fileService.uploadFile(image, dir, 'avatar');

    const newUser = await userService.create({
      login,
      email,
      password,
      role: 'USER',
      image: pathToImage,
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
