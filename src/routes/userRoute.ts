import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { validator } from 'hono/validator';

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
    const id = value.id;

    if (isNaN(Number(id))) {
      return c.text('Invalid ID!', 400);
    }
    return { id };
  }),
  async (c) => {
    const { id } = c.req.valid('param');
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return c.json({ error: 'Not Found', ok: false, data: user }, 404);
    }

    return c.json({ data: user, ok: true });
  }
);

userRoute.post('/users', async (c) => {
  const { login, email, password } = c.req.query();
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
    data: { login, email, password },
  });

  return c.json({ data: newUser, ok: true }, 201);
});

userRoute.patch('/users/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const { login, email } = c.req.query();
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return c.json({ error: 'Not Found', ok: false }, 404);
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { login, email },
  });

  return c.json({ data: updatedUser, ok: true }, 200);
});

userRoute.delete('/users/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return c.json({ error: 'Not Found', ok: false }, 404);
  }

  const deletedUser = await prisma.user.delete({
    where: { id },
  });

  return c.json({ ok: true, data: deletedUser });
});
