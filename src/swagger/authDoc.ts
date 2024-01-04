import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { userSchema } from '../models/userSchema';

export const authDoc = new OpenAPIHono();

authDoc.openapi(
  createRoute({
    method: 'post',
    path: '/signup',
    requestBody: {
      description: 'Registration for new User',
      content: {
        'application/json': {
          example: {
            login: 'JohnDoe',
            email: 'JohnDoe@mail.com',
            password: '12345678aA&',
          },
        },
      },
    },
    tags: ['auth'],
    summary: 'Add new User to the database',
    responses: {
      201: {
        description: 'Returns new User',
        content: {
          'application/json': {
            schema: z.object({ data: userSchema, ok: z.boolean() }),
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

authDoc.openapi(
  createRoute({
    method: 'post',
    path: '/signin',
    requestBody: {
      description: 'Sign in for existing User',
      content: {
        'application/json': {
          example: {
            email: 'JohnDoe@mail.com',
            password: '12345678aA&',
          },
        },
      },
    },
    tags: ['auth'],
    summary: 'Return User token for authentication',
    responses: {
      201: {
        description: 'Returns token',
        content: {
          'application/json': {
            schema: z.string(),
          },
        },
      },
    },
  }),
  (c) => {
    return c.json(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIn0.ah5g-pNjuDZKK4QOEpcAWXmkP3Gstd1fmpmTB15cpdg'
    );
  }
);
