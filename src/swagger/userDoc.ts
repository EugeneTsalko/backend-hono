import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { userSchema } from '../models/userSchema';

export const userDoc = new OpenAPIHono();

userDoc.openapi(
  createRoute({
    method: 'get',
    path: '/users',
    tags: ['users'],
    summary: 'Find all users',
    responses: {
      200: {
        description: 'Returns all users',
        content: {
          'application/json': {
            schema: z.object({ data: z.array(userSchema), ok: z.boolean() }),
          },
        },
      },
    },
  }),
  (c) => {
    return c.json({
      data: [
        {
          id: 1,
          login: 'JohnDoe',
          email: 'JohnDoe@mail.com',
          password: 'hashedPassword',
          role: 'USER',
        },
        {
          id: 2,
          login: 'Someone',
          email: 'someone42@example.com',
          password: 'hashedPassword',
          role: 'USER',
        },
      ],
      ok: true,
    });
  }
);

userDoc.openapi(
  createRoute({
    method: 'get',
    path: '/users/{id}',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: `ID of user to use`,
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    tags: ['users'],
    summary: 'Find user by ID',
    responses: {
      200: {
        description: 'Returns one user',
        content: {
          'application/json': {
            schema: z.object({ data: userSchema, ok: z.boolean() }),
          },
        },
      },
      404: {
        description: 'User with this ID was not found',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
              ok: z.boolean(),
            }),
          },
        },
      },
    },
  }),
  (c) => {
    return c.json({
      data: {
        id: 1,
        login: 'JohnDoe',
        email: 'JohnDoe@mail.com',
        password: 'hashedPassword',
        role: 'USER',
      },
      ok: true,
    });
  }
);

userDoc.openapi(
  createRoute({
    method: 'post',
    path: '/users',
    requestBody: {
      description: 'Create new User to the database',
      content: {
        'application/json': {
          example: {
            login: 'JohnDoe',
            email: 'JohnDoe@mail.com',
            password: '12345678aA&',
            role: 'USER',
          },
        },
      },
    },
    tags: ['users'],
    summary: 'Add new User to the database',
    responses: {
      201: {
        description: 'Returns new user',
        content: {
          'application/json': {
            schema: z.object({ data: userSchema, ok: z.boolean() }),
          },
        },
      },
      409: {
        description: 'User with same email or login is already exists',
        content: {
          'application/json': {
            schema: z.object({ message: z.string(), ok: z.boolean() }),
          },
        },
      },
    },
  }),
  (c) => {
    return c.json({
      data: {
        id: 1,
        login: 'JohnDoe',
        email: 'JohnDoe@mail.com',
        password: 'hashedPassword',
        role: 'USER',
      },
      ok: true,
    });
  }
);

userDoc.openapi(
  createRoute({
    method: 'patch',
    path: '/users',
    requestBody: {
      description: 'Update existing User in the database by ID',
      content: {
        'application/json': {
          example: {
            id: 2,
            login: 'JohnDoe42',
            email: 'JohnDoeNewMail@mail.com',
          },
        },
      },
    },
    tags: ['users'],
    summary: 'Edit User in the database by ID',
    responses: {
      200: {
        description: 'Returns updated user',
        content: {
          'application/json': {
            schema: z.object({ data: userSchema, ok: z.boolean() }),
          },
        },
      },
      409: {
        description: 'User with same email or login is already exists',
        content: {
          'application/json': {
            schema: z.object({ message: z.string(), ok: z.boolean() }),
          },
        },
      },
    },
  }),
  (c) => {
    return c.json({
      data: {
        id: 2,
        login: 'JohnDoe42',
        email: 'JohnDoeNewMail@mail.com',
        password: 'hashedPassword',
        role: 'USER',
      },
      ok: true,
    });
  }
);

userDoc.openapi(
  createRoute({
    method: 'delete',
    path: '/users/{id}',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: `ID of user to use`,
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    tags: ['users'],
    summary: 'Delete user by ID',
    responses: {
      200: {
        description: 'Returns deleted user',
        content: {
          'application/json': {
            schema: z.object({ data: userSchema, ok: z.boolean() }),
          },
        },
      },
      404: {
        description: 'User with this ID was not found',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
              ok: z.boolean(),
            }),
          },
        },
      },
    },
  }),
  (c) => {
    return c.json({
      data: {
        id: 1,
        login: 'JohnDoe',
        email: 'JohnDoe@mail.com',
        password: 'hashedPassword',
        role: 'USER',
      },
      ok: true,
    });
  }
);
