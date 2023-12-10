import { type Context, type Env } from 'hono';
import { postRepository } from '../dataAcces/postRepository';
import { type IdContext, type PostContext } from '../models/contextModel';

export const postController = {
  async findAll(
    c: Context<Env, '/posts', Record<string, unknown>>
  ): Promise<Response> {
    const posts = await postRepository.getAll();

    return c.json({ data: posts, ok: true }, 200);
  },

  async findById(c: IdContext): Promise<Response> {
    const { id } = c.req.valid('param');
    const post = await postRepository.getById(id);

    return c.json({ data: post, ok: true }, 200);
  },

  async create(c: PostContext) {
    const post = c.req.valid('json');
    const newPost = await postRepository.create(post);

    return c.json({ data: newPost, ok: true }, 201);
  },

  async update(c: PostContext) {
    const post = c.req.valid('json');
    const updatedPost = await postRepository.update(post);

    return c.json({ data: updatedPost, ok: true }, 200);
  },

  async delete(c: IdContext) {
    const { id } = c.req.valid('param');
    const deletedPost = await postRepository.delete(id);

    return c.json({ data: deletedPost, ok: true }, 200);
  },
};
