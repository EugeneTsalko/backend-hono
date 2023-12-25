import { type Context, type Env } from 'hono';
import { type CommentContext, type IdContext } from '../models/contextModel';
import { commentRepository } from '../dataAcces/commentRepository';

export const commentController = {
  async findAll(
    c: Context<Env, '/comments', Record<string, unknown>>
  ): Promise<Response> {
    const comments = await commentRepository.getAll();

    return c.json({ data: comments, ok: true }, 200);
  },

  async findById(c: IdContext): Promise<Response> {
    const { id } = c.req.valid('param');
    const comment = await commentRepository.getById(id);

    return c.json({ data: comment, ok: true }, 200);
  },

  async create(c: CommentContext) {
    const comment = c.req.valid('json');
    const newComment = await commentRepository.create(comment);

    return c.json({ data: newComment, ok: true }, 201);
  },

  async update(c: CommentContext) {
    const comment = c.req.valid('json');
    const updatedComment = await commentRepository.update(comment);

    return c.json({ data: updatedComment, ok: true }, 200);
  },

  async delete(c: IdContext) {
    const { id } = c.req.valid('param');
    const deletedComment = await commentRepository.delete(id);

    return c.json({ data: deletedComment, ok: true }, 200);
  },
};
