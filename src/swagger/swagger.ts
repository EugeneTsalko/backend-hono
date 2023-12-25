import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';

export const docRoutes = new OpenAPIHono();

docRoutes.get('/docs', swaggerUI({ url: 'doc' }));

docRoutes.doc('/doc', {
  info: {
    title: 'Node.js API with Hono.js by EugeneTsalko.',
    version: 'v0.9',
    description: 'Server with Auth and CRUD for Users, Posts, Comments.',
  },
  openapi: '3.1.0',
});
