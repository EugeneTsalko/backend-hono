import { Hono } from 'hono';
import { validateId } from '../middleware/idValidation';
import { jwt } from 'hono/jwt';
import { isSignedIn } from '../middleware/authValidation';
import { commentController } from '../controllers/commentController';
import { validateComment } from '../middleware/commentValidation';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;

export const commentRoutes = new Hono().basePath('/comments');

commentRoutes.get(
  '/',
  jwt({
    secret: JWT_ACCESS_SECRET,
  }),
  isSignedIn,
  commentController.findAll
);

commentRoutes.get(
  '/:id',
  jwt({
    secret: JWT_ACCESS_SECRET,
  }),
  isSignedIn,
  validateId,
  commentController.findById
);

commentRoutes.post(
  '/',
  jwt({
    secret: JWT_ACCESS_SECRET,
  }),
  isSignedIn,
  validateComment,
  commentController.create
);

commentRoutes.patch(
  '/',
  jwt({
    secret: JWT_ACCESS_SECRET,
  }),
  isSignedIn,
  validateComment,
  commentController.update
);

commentRoutes.delete(
  '/:id',
  jwt({
    secret: JWT_ACCESS_SECRET,
  }),
  isSignedIn,
  validateId,
  commentController.delete
);
