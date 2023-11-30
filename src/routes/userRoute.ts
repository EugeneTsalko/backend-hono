import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { validator } from 'hono/validator';
import {
  schemaEmail,
  schemaId,
  schemaLogin,
  schemaPassword,
  schemaUser,
} from '../models/userSchema';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const userRoute = new Hono();

userRoute.get('/', async (c) => {
  return c.text('Hello!');
});

userRoute.get('/users', async (c) => {
  const allUsers = await prisma.user.findMany();
  return c.json({ data: allUsers, ok: true });
});

userRoute.get(
  '/users/:id',
  validator('param', (value, c) => {
    const parsedId = schemaId.safeParse(value.id);

    if (!parsedId.success) {
      return c.json({ error: 'Invalid ID. Not Found.', ok: false }, 404);
    }
    return { id: value.id };
  }),
  async (c) => {
    const { id } = c.req.valid('param');
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return c.json(
        { error: `User with ID: ${id} was not found.`, ok: false },
        404
      );
    }

    return c.json({ data: user, ok: true });
  }
);

userRoute.post(
  '/users',
  validator('form', (value, c) => {
    const parsedUser = schemaUser.safeParse(value);
    if (!parsedUser.success) {
      return c.json(
        { error: 'Login, Email or Password are incorrect.', ok: false },
        400
      );
    }
    const { login, email, password } = parsedUser.data;

    return { login, email, password };
  }),
  async (c) => {
    const { login, email, password } = c.req.valid('form');
    const hashedPassword = await bcrypt.hash(password, 8);

    const isUserExists = await prisma.user.findMany({
      where: {
        OR: [{ email }, { login }],
      },
    });

    if (isUserExists.length > 0) {
      return c.json(
        {
          error: 'User with same login or email is already exists',
          ok: false,
        },
        409
      );
    }

    const newUser = await prisma.user.create({
      data: { login, email, password: hashedPassword },
    });

    return c.json({ data: newUser, ok: true }, 201);
  }
);

userRoute.patch(
  '/users/:id',
  validator('param', (value, c) => {
    const parsedId = schemaId.safeParse(value.id);

    if (!parsedId.success) {
      return c.json({ error: 'Invalid ID. Not Found.', ok: false }, 404);
    }
    return { id: value.id };
  }),
  validator('json', (value, c) => {
    const { login, email, password } = value;
    const parsedLogin = schemaLogin.safeParse(value.login);
    const parsedEmail = schemaEmail.safeParse(value.email);
    const parsedPassword = schemaPassword.safeParse(value.password);
    console.log(login);
    console.log(parsedLogin);

    if (login && !parsedLogin.success) {
      return c.json(
        { error: 'Login must be non-empty string', ok: false },
        400
      );
    }

    if (email && !parsedEmail.success) {
      return c.json(
        { error: 'Email must be like mail@example.by', ok: false },
        400
      );
    }

    if (password && !parsedPassword.success) {
      return c.json(
        {
          error:
            'Password must include lowercase letter, uppercase letter, special character and be minimum 8 characters length.',
          ok: false,
        },
        400
      );
    }

    return { login, email, password };
  }),
  async (c) => {
    const id = Number(c.req.param('id'));
    const { login, email, password } = c.req.valid('json');
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return c.json({ error: 'Not Found', ok: false }, 404);
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { login, email, password: hashedPassword },
    });

    return c.json({ data: updatedUser, ok: true }, 200);
  }
);
