import bcrypt from 'bcrypt';
import { userRepository } from '../dataAcces/userRepository';
import { type User } from '@prisma/client';
import { type UserBodyType } from '../models/userModel';

export const userService = {
  hashPassword(plainPassword: string) {
    return bcrypt.hashSync(plainPassword, 8);
  },

  async create(user: UserBodyType) {
    const { login, email, password, role } = user;
    await userRepository.getByLoginOrEmail(login, email);

    const hashedPassword = this.hashPassword(password);
    const newUser = await userRepository.create({
      login,
      email,
      password: hashedPassword,
      role,
    });

    return newUser;
  },

  async update(user: User): Promise<User> {
    const { id, login, email, password, role } = user;
    await userRepository.getById(id);
    await userRepository.getByLoginOrEmail(login, email);

    const hashedPassword = this.hashPassword(password);

    const updatedUser = await userRepository.update({
      id,
      login,
      email,
      password: hashedPassword,
      role,
    });

    return updatedUser;
  },
};
