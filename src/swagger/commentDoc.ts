import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { schemaComment } from '../models/commentSchema';

export const commentDoc = new OpenAPIHono();

commentDoc.openapi(
  createRoute({
    method: 'get',
    path: '/comments',
    tags: ['comments'],
    security: [{ bearer: ['read', 'write'] }],
    summary: 'Find all comments',
    responses: {
      200: {
        description: 'Returns all comments',
        content: {
          'application/json': {
            schema: z.object({ data: z.array(schemaComment), ok: z.boolean() }),
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
          postId: 1,
          createdAt: '2023-12-25T19:15:03.778Z',
          likedBy: [],
          dislikedBy: [],
          text: 'comment text',
        },
        {
          id: 2,
          authorId: 3,
          postId: 2,
          createdAt: '2023-12-25T19:15:03.778Z',
          likedBy: [],
          dislikedBy: [],
          text: 'comment text 2',
        },
      ],
      ok: true,
    });
  }
);

commentDoc.openapi(
  createRoute({
    method: 'get',
    path: '/comments/{id}',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: `ID of comment to use`,
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    tags: ['comments'],
    security: [{ bearer: ['read', 'write'] }],
    summary: 'Find comment by ID',
    responses: {
      200: {
        description: 'Returns one comment',
        content: {
          'application/json': {
            schema: z.object({ data: schemaComment, ok: z.boolean() }),
          },
        },
      },
      404: {
        description: 'Comment with this ID was not found',
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
        postId: 1,
        createdAt: '2023-12-25T19:15:03.778Z',
        likedBy: [],
        dislikedBy: [],
        text: 'comment text',
      },
      ok: true,
    });
  }
);

commentDoc.openapi(
  createRoute({
    method: 'post',
    path: '/comments',
    requestBody: {
      description: 'Create new Comment to the database',
      content: {
        'application/json': {
          example: {
            authorId: 1,
            postId: 1,
            text: 'lorem ipsum dolor',
          },
        },
      },
    },
    tags: ['comments'],
    security: [{ bearer: ['read', 'write'] }],
    summary: 'Add new Comments to the database',
    responses: {
      201: {
        description: 'Returns new Comment',
        content: {
          'application/json': {
            schema: z.object({ data: schemaComment, ok: z.boolean() }),
          },
        },
      },
      404: {
        description: 'User or Post with this ID was not found',
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
        postId: 1,
        createdAt: '2023-12-25T19:15:03.778Z',
        likedBy: [],
        dislikedBy: [],
        text: 'lorem ipsum dolor',
      },
      ok: true,
    });
  }
);

commentDoc.openapi(
  createRoute({
    method: 'patch',
    path: '/comments',
    requestBody: {
      description: 'Update existing Comment in the database by ID',
      content: {
        'application/json': {
          example: {
            id: 1,
            authorId: 3,
            text: 'updated comment text',
          },
        },
      },
    },
    tags: ['comments'],
    security: [{ bearer: ['read', 'write'] }],
    summary: 'Edit Comment in the database by ID',
    responses: {
      200: {
        description: 'Returns updated comment',
        content: {
          'application/json': {
            schema: z.object({ data: schemaComment, ok: z.boolean() }),
          },
        },
      },
      404: {
        description: 'Comment, User or Post with this ID was not found',
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
        postId: 1,
        createdAt: '2023-12-25T19:15:03.778Z',
        likedBy: [],
        dislikedBy: [],
        text: 'updated comment text',
      },
      ok: true,
    });
  }
);

commentDoc.openapi(
  createRoute({
    method: 'patch',
    path: '/comments/like/{id}',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: `ID of comment to use`,
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    tags: ['comments'],
    security: [{ bearer: ['read', 'write'] }],
    summary: 'Like comment by ID',
    responses: {
      200: {
        description: 'Returns one comment',
        content: {
          'application/json': {
            schema: z.object({ data: schemaComment, ok: z.boolean() }),
          },
        },
      },
      404: {
        description: 'Comment or user with this ID was not found',
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
        postId: 1,
        createdAt: '2023-12-25T19:15:03.778Z',
        likedBy: [{ userId: 1, commentId: 1 }],
        dislikedBy: [],
        text: 'comment text',
      },
      ok: true,
    });
  }
);

commentDoc.openapi(
  createRoute({
    method: 'patch',
    path: '/comments/dislike/{id}',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: `ID of comment to use`,
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    tags: ['comments'],
    security: [{ bearer: ['read', 'write'] }],
    summary: 'Dislike comment by ID',
    responses: {
      200: {
        description: 'Returns one comment',
        content: {
          'application/json': {
            schema: z.object({ data: schemaComment, ok: z.boolean() }),
          },
        },
      },
      404: {
        description: 'Comment or user with this ID was not found',
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
        postId: 1,
        createdAt: '2023-12-25T19:15:03.778Z',
        likedBy: [],
        dislikedBy: [{ userId: 1, commentId: 1 }],
        text: 'comment text',
      },
      ok: true,
    });
  }
);

commentDoc.openapi(
  createRoute({
    method: 'delete',
    path: '/comments/{id}',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: `ID of comment to use`,
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    tags: ['comments'],
    security: [{ bearer: ['read', 'write'] }],
    summary: 'Delete comment by ID',
    responses: {
      200: {
        description: 'Returns deleted comment',
        content: {
          'application/json': {
            schema: z.object({ data: schemaComment, ok: z.boolean() }),
          },
        },
      },
      404: {
        description: 'Comment with this ID was not found',
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
        postId: 1,
        createdAt: '2023-12-25T19:15:03.778Z',
        likedBy: [],
        dislikedBy: [],
        text: 'lorem ipsum dolor',
      },
      ok: true,
    });
  }
);
