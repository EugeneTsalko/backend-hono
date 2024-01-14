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
            image: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJUSURBVDiNfZI9TBRxEMV//93/7t4nd5cDjQm5oBix0VITEyu0MSRGEz9CtLCSwoLCWBorG21MVEgkinaisbCiJVAoiYkY7AgJH0HBAw9c9m5vb3csjoMjKK98mfdm5s0oEYHPlwdBysxbd7kyErIf3l01KQSPQcU5/aHPqLPSIUI/hWCUiZ7cf8UTPTkKwagI/SAdABog8CXjrodkWvU5w7Im+db7EsfRaPMIAMr4il9Zw7LuRxFH14s1UhkzYzUMBFQYCp4npLLWURznIVrvdBYB24GMgbtQIgwFAQVgNGoSWZtUiwnpNLvEzbAs0odbsdPONmUAKNOIJxJAPA6muW+GSilS7VkwDGvbQMfMLgBisX3F2121gc6lCjsThKGN1qAUxbWI2floj+jHSsTc0g5vOPZWBtM3zyCiGqM/extj6OPBPQaD71t4PtJ0YaXyzN4uaGpRGwBh/X9s+YXrrgLpXQZRZRELDaSaSEkrkQeayakqoMjnd4lm5iKSCcWhNvWvKFw62zPmrS7nkiguVr1Q+25AUKlhJ2yUUjwZ9vjjmZzoMpBIcJddKqUK/oZP+be3tPJpdkGJCNGXa32VUnmgWhVUPEayLYl2LCSU+rqmouYHbBY9RAQ7aYd22uzWx9+MqcXX3flQm3cOFJIXYpacwrII7Tj+RpXN8TgAybNlnGwM06k/mLfqDRRnistmLXyqRKQRq8HU9WF8/wagSCYJxwsAmOdXGnuXQN2j88VQ/b+hyWAL070nCaIBougYUZRD6wDH/o5tjaGjR3S8+tlc/hdX/OH+y2qbHAAAAABJRU5ErkJggg==',
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
        image: 'Base64 string',
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
