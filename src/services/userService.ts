import bcrypt from 'bcrypt';
import { userRepository } from '../dataAcces/userRepository';
import { type IUser } from '../models/userModel';
import { type User } from '@prisma/client';

export const userService = {
  hashPassword(plainPassword: string) {
    return bcrypt.hashSync(plainPassword, 8);
  },

  async createUser(user: IUser): Promise<IUser> {
    const { login, email, password } = user;
    await userRepository.getByLoginOrEmail(login, email);

    const hashedPassword = this.hashPassword(password);
    const postedUser = await userRepository.postUser({
      login,
      email,
      password: hashedPassword,
    });

    return postedUser;
  },

  async updateUser(user: User): Promise<User> {
    const { id, login, email, password } = user;
    await userRepository.getById(id);
    await userRepository.getByLoginOrEmail(login, email);

    const hashedPassword = this.hashPassword(password);

    const updatedUser = await userRepository.patchUser({
      id,
      login,
      email,
      password: hashedPassword,
    });

    return updatedUser;
  },
};
