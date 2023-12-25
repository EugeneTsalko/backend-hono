import { Hono } from 'hono';
import { postController } from '../controllers/postController';
import { validatePost } from '../middleware/postValidation';
import { validateId } from '../middleware/idValidation';
import { jwt } from 'hono/jwt';
import { isSignedIn } from '../middleware/authValidation';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;

export const postRoutes = new Hono().basePath('/posts');

postRoutes.get(
  '/',
  jwt({
    secret: JWT_ACCESS_SECRET,
  }),
  isSignedIn,
  postController.findAll
);

postRoutes.get(
  '/:id',
  jwt({
    secret: JWT_ACCESS_SECRET,
  }),
  isSignedIn,
  validateId,
  postController.findById
);

postRoutes.post(
  '/',
  jwt({
    secret: JWT_ACCESS_SECRET,
  }),
  isSignedIn,
  validatePost,
  postController.create
);

postRoutes.patch(
  '/',
  jwt({
    secret: JWT_ACCESS_SECRET,
  }),
  isSignedIn,
  validatePost,
  postController.update
);

postRoutes.delete(
  '/:id',
  jwt({
    secret: JWT_ACCESS_SECRET,
  }),
  isSignedIn,
  validateId,
  postController.delete
);
