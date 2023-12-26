import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { userDoc } from './userDoc';
import { postDoc } from './postDoc';
import { authDoc } from './authDoc';
import { commentDoc } from './commentDoc';

export const docRoutes = new OpenAPIHono();

docRoutes.route('/', userDoc);
docRoutes.route('/', postDoc);
docRoutes.route('/', commentDoc);
docRoutes.route('/', authDoc);

docRoutes.doc('/doc', {
  info: {
    title: 'Node.js API with Hono.js by EugeneTsalko.',
    version: 'v0.9',
    description: 'Server with Auth and CRUD for Users, Posts, Comments.',
  },
  openapi: '3.1.0',
  tags: [
    { name: 'users', description: 'Operations with users.' },
    { name: 'posts', description: 'Operations with posts.' },
    { name: 'comments', description: 'Operations with comments.' },
    { name: 'auth', description: 'Operations with authentication.' },
  ],
});

docRoutes.openAPIRegistry.registerComponent('securitySchemes', 'bearer', {
  type: 'http',
  scheme: 'bearer',
});

docRoutes.get('/docs', swaggerUI({ url: 'doc' }));
