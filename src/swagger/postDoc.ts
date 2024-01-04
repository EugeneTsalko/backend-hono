import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { schemaPost } from '../models/postSchema';

export const postDoc = new OpenAPIHono();

postDoc.openapi(
  createRoute({
    method: 'get',
    path: '/posts',
    tags: ['posts'],
    security: [{ bearer: ['read', 'write'] }],
    summary: 'Find all posts',
    responses: {
      200: {
        description: 'Returns all posts',
        content: {
          'application/json': {
            schema: z.object({ data: z.array(schemaPost), ok: z.boolean() }),
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
          authorId: 1,
          createdAt: '2023-12-25T19:15:03.778Z',
          text: 'post text',
        },
        {
          id: 2,
          authorId: 3,
          createdAt: '2023-12-25T19:15:03.778Z',
          text: 'another post text',
        },
      ],
      ok: true,
    });
  }
);

postDoc.openapi(
  createRoute({
    method: 'get',
    path: '/posts/{id}',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: `ID of post to use`,
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    tags: ['posts'],
    security: [{ bearer: ['read', 'write'] }],
    summary: 'Find post by ID',
    responses: {
      200: {
        description: 'Returns one post',
        content: {
          'application/json': {
            schema: z.object({ data: schemaPost, ok: z.boolean() }),
          },
        },
      },
      404: {
        description: 'Post with this ID was not found',
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
        authorId: 1,
        createdAt: '2023-12-25T19:15:03.778Z',
        text: 'post text',
      },
      ok: true,
    });
  }
);

postDoc.openapi(
  createRoute({
    method: 'post',
    path: '/posts',
    requestBody: {
      description: 'Create new Post to the database',
      content: {
        'application/json': {
          example: {
            authorId: 1,
            text: 'lorem ipsum dolor',
          },
        },
      },
    },
    tags: ['posts'],
    security: [{ bearer: ['read', 'write'] }],
    summary: 'Add new Post to the database',
    responses: {
      201: {
        description: 'Returns new Post',
        content: {
          'application/json': {
            schema: z.object({ data: schemaPost, ok: z.boolean() }),
          },
        },
      },
      404: {
        description: 'User with this ID was not found',
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
        authorId: 1,
        createdAt: '2023-12-25T19:15:03.778Z',
        text: 'post text',
      },
      ok: true,
    });
  }
);

postDoc.openapi(
  createRoute({
    method: 'patch',
    path: '/posts',
    requestBody: {
      description: 'Update existing Post in the database by ID',
      content: {
        'application/json': {
          example: {
            id: 1,
            authorId: 3,
            text: 'updated text',
          },
        },
      },
    },
    tags: ['posts'],
    security: [{ bearer: ['read', 'write'] }],
    summary: 'Edit Post in the database by ID',
    responses: {
      200: {
        description: 'Returns updated post',
        content: {
          'application/json': {
            schema: z.object({ data: schemaPost, ok: z.boolean() }),
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
        authorId: 3,
        createdAt: '2023-12-25T19:15:03.778Z',
        text: 'updated text',
      },
      ok: true,
    });
  }
);

postDoc.openapi(
  createRoute({
    method: 'delete',
    path: '/posts/{id}',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: `ID of post to use`,
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    tags: ['posts'],
    security: [{ bearer: ['read', 'write'] }],
    summary: 'Delete post by ID',
    responses: {
      200: {
        description: 'Returns deleted post',
        content: {
          'application/json': {
            schema: z.object({ data: schemaPost, ok: z.boolean() }),
          },
        },
      },
      404: {
        description: 'Post with this ID was not found',
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
        authorId: 1,
        createdAt: '2023-12-25T19:15:03.778Z',
        text: 'post text',
      },
      ok: true,
    });
  }
);
