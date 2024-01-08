import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { routes } from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandling';

const app = new Hono();
app.route('/', routes);

app.onError(errorHandler);

app.notFound(notFoundHandler);

serve(app);

// app.post('/img', async (c) => {
//   const formData = await c.req.formData();
//   console.log(formData);

//   const file = formData.get('image') as File;
//   console.log(file);
//   const arr = await file.arrayBuffer();
//   console.log(arr);

//   const dir = `./upload/user/user_id/avatar`;

//   const pathToFile = await uploadFile(file, dir, 'avatar');

//   return c.text(pathToFile);
// });
