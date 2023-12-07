import { type Env, type Context } from 'hono';
import { userRepository } from '../dataAcces/userRepository';
import { type IUser } from '../models/userModel';
import { userService } from '../services/userService';

export const userController = {
  async findAllUsers(
    c: Context<Env, '/users', Record<string, unknown>>
  ): Promise<Response> {
    const users: IUser[] = await userRepository.getAll();

    return c.json({ data: users, ok: true }, 200);
  },
  async findUserById(
    c: Context<
      Env,
      '/users/:id',
      {
        in: {
          param: {
            id: string;
          };
        };
        out: {
          param: {
            id: number;
          };
        };
      }
    >
  ): Promise<Response> {
    const { id } = c.req.valid('param');
    const user: IUser | null = await userRepository.getById(id);

    return c.json({ data: user, ok: true }, 200);
  },

  async createUser(
    c: Context<
      Env,
      '/users',
      {
        in: {
          json: {
            login: string;
            email: string;
            password: string;
          };
        };
        out: {
          json: {
            login: string;
            email: string;
            password: string;
          };
        };
      }
    >
  ) {
    const { login, email, password } = c.req.valid('json');
    const newUser = await userService.createUser({ login, email, password });

    return c.json({ data: newUser, ok: true }, 201);
  },

  async updateUser(
    c: Context<
      Env,
      '/users/:id',
      {
        in: {
          param: {
            id: string;
          };
        };
        out: {
          param: {
            id: string;
          };
        };
      } & {
        in: {
          json: {
            login: any;
            email: any;
            password: any;
          };
        };
        out: {
          json: {
            login: any;
            email: any;
            password: any;
          };
        };
      }
    >
  ) {
    const id = Number(c.req.param('id'));
    const { login, email, password } = c.req.valid('json');
    const updatedUser = await userService.updateUser({
      id,
      login,
      email,
      password,
    });

    return c.json({ data: updatedUser, ok: true }, 200);
  },
};
