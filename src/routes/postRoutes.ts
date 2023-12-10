import { Hono } from 'hono';
import { postController } from '../controllers/postController';
import { validatePost } from '../middleware/postValidation';
import { validateId } from '../middleware/idValidation';

export const postRoutes = new Hono().basePath('/posts');

postRoutes.get('/', postController.findAll);

postRoutes.get('/:id', validateId, postController.findById);

postRoutes.post('/', validatePost, postController.create);

postRoutes.patch('/', validatePost, postController.update);

postRoutes.delete('/:id', validateId, postController.delete);
