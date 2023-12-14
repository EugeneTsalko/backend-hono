import bcrypt from 'bcrypt';
import { userRepository } from '../dataAcces/userRepository';
import { type User } from '@prisma/client';
import { type UserBodyType } from '../models/userModel';
import { DbError } from '../errors/errors';

export const userService = {
  hashPassword(plainPassword: string) {
    return bcrypt.hashSync(plainPassword, 8);
  },

  async create(user: UserBodyType) {
    const { login, email, password, role } = user;

    const existingUsers = await userRepository.getByLoginOrEmail({
      email,
      login,
    });

    if (existingUsers.length > 0) {
      throw new DbError(`User with same email or login is already exists`, 409);
    }

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
    const existingUsers = await userRepository.getByLoginOrEmail({
      email,
      login,
    });

    if (existingUsers.length > 0) {
      throw new DbError(`User with same email or login is already exists`, 409);
    }
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
