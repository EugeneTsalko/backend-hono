import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { userSchema } from '../models/userSchema';

export const userDoc = new OpenAPIHono();

userDoc.openapi(
  createRoute({
    method: 'get',
    path: '/users',
    tags: ['users'],
    security: [{ bearer: ['read', 'write'] }],
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
          image: 'Base64 string'
        },
        {
          id: 2,
          login: 'Someone',
          email: 'someone42@example.com',
          password: 'hashedPassword',
          role: 'USER',
          image: 'Base64 string'
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
    security: [{ bearer: ['read', 'write'] }],
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
        image: 'Base64 string'
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
            image: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJUSURBVDiNfZI9TBRxEMV//93/7t4nd5cDjQm5oBix0VITEyu0MSRGEz9CtLCSwoLCWBorG21MVEgkinaisbCiJVAoiYkY7AgJH0HBAw9c9m5vb3csjoMjKK98mfdm5s0oEYHPlwdBysxbd7kyErIf3l01KQSPQcU5/aHPqLPSIUI/hWCUiZ7cf8UTPTkKwagI/SAdABog8CXjrodkWvU5w7Im+db7EsfRaPMIAMr4il9Zw7LuRxFH14s1UhkzYzUMBFQYCp4npLLWURznIVrvdBYB24GMgbtQIgwFAQVgNGoSWZtUiwnpNLvEzbAs0odbsdPONmUAKNOIJxJAPA6muW+GSilS7VkwDGvbQMfMLgBisX3F2121gc6lCjsThKGN1qAUxbWI2floj+jHSsTc0g5vOPZWBtM3zyCiGqM/extj6OPBPQaD71t4PtJ0YaXyzN4uaGpRGwBh/X9s+YXrrgLpXQZRZRELDaSaSEkrkQeayakqoMjnd4lm5iKSCcWhNvWvKFw62zPmrS7nkiguVr1Q+25AUKlhJ2yUUjwZ9vjjmZzoMpBIcJddKqUK/oZP+be3tPJpdkGJCNGXa32VUnmgWhVUPEayLYl2LCSU+rqmouYHbBY9RAQ7aYd22uzWx9+MqcXX3flQm3cOFJIXYpacwrII7Tj+RpXN8TgAybNlnGwM06k/mLfqDRRnistmLXyqRKQRq8HU9WF8/wagSCYJxwsAmOdXGnuXQN2j88VQ/b+hyWAL070nCaIBougYUZRD6wDH/o5tjaGjR3S8+tlc/hdX/OH+y2qbHAAAAABJRU5ErkJggg==',
          },
        },
      },
    },
    tags: ['users'],
    security: [{ bearer: ['read', 'write'] }],
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
      400: {
        description: 'Need ADMIN for this route.',
        content: {
          'application/json': {
            schema: z.object({ message: z.string(), ok: z.boolean() }),
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
        image: 'Base64 string'
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
    security: [{ bearer: ['read', 'write'] }],
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
        image: 'Base64 string',
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
    security: [{ bearer: ['read', 'write'] }],
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
      400: {
        description: 'Need ADMIN for this route.',
        content: {
          'application/json': {
            schema: z.object({ message: z.string(), ok: z.boolean() }),
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
        image: 'Base64 string'
      },
      ok: true,
    });
  }
);
