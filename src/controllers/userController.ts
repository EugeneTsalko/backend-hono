import { type Context } from 'hono';
import { userRepository } from '../dataAcces/userRepository';
import { userService } from '../services/userService';
import { type IdContext, type UserContext } from '../models/contextModel';

export const userController = {
  async findAll(c: Context) {
    const users = await userRepository.getAll();

    return c.json({ data: users, ok: true }, 200);
  },

  async findById(c: IdContext): Promise<Response> {
    const { id } = c.req.valid('param');
    const user = await userRepository.getById(id);

    return c.json({ data: user, ok: true }, 200);
  },

  async create(c: UserContext) {
    const { login, email, password, role } = c.req.valid('json');
    const newUser = await userService.create({ login, email, password, role });

    return c.json({ data: newUser, ok: true }, 201);
  },

  async update(c: UserContext) {
    const userData = c.req.valid('json');

    const updatedUser = await userService.update(userData);

    return c.json({ data: updatedUser, ok: true }, 200);
  },

  async delete(c: IdContext) {
    const { id } = c.req.valid('param');
    const deletedUser = await userRepository.delete(id);

    return c.json({ data: deletedUser, ok: true }, 200);
  },
};
