import { Hono } from 'hono';
import { userController } from '../controllers/userController';
import { validateUser } from '../middleware/userValidation';
import { validateId } from '../middleware/idValidation';
import { isAdmin, isSignedIn } from '../middleware/authValidation';
import { jwt } from 'hono/jwt';

export const userRoutes = new Hono().basePath('/users');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;

userRoutes.get(
  '/',
  jwt({
    secret: JWT_ACCESS_SECRET,
  }),
  isSignedIn,
  userController.findAll
);

userRoutes.get(
  '/:id',
  jwt({
    secret: JWT_ACCESS_SECRET,
  }),
  isSignedIn,
  validateId,
  userController.findById
);

userRoutes.post(
  '/',
  jwt({
    secret: JWT_ACCESS_SECRET,
  }),
  isAdmin,
  validateUser,
  userController.create
);

userRoutes.patch(
  '/',
  jwt({
    secret: JWT_ACCESS_SECRET,
  }),
  isSignedIn,
  validateUser,
  userController.update
);

userRoutes.delete(
  '/:id',
  jwt({
    secret: JWT_ACCESS_SECRET,
  }),
  isAdmin,
  validateId,
  userController.delete
);
