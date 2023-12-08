import { type Env, type Context } from 'hono';
import { userRepository } from '../dataAcces/userRepository';
import { userService } from '../services/userService';
import { type UserIdContext, type UserContext } from '../models/contextModel';

export const userController = {
  async findAllUsers(
    c: Context<Env, '/users', Record<string, unknown>>
  ): Promise<Response> {
    const users = await userRepository.getAll();

    return c.json({ data: users, ok: true }, 200);
  },

  async findUserById(c: UserIdContext): Promise<Response> {
    const { id } = c.req.valid('param');
    const user = await userRepository.getById(id);

    return c.json({ data: user, ok: true }, 200);
  },

  async createUser(c: UserContext) {
    const { login, email, password } = c.req.valid('json');
    const newUser = await userService.createUser({ login, email, password });

    return c.json({ data: newUser, ok: true }, 201);
  },

  async updateUser(c: UserContext) {
    const { id, login, email, password } = c.req.valid('json');
    const updatedUser = await userService.updateUser({
      id,
      login,
      email,
      password,
    });

    return c.json({ data: updatedUser, ok: true }, 200);
  },

  async deleteUser(c: UserIdContext) {
    const { id } = c.req.valid('param');
    const deletedUser = await userRepository.deleteUser(id);

    return c.json({ data: deletedUser, ok: true }, 200);
  },
};
