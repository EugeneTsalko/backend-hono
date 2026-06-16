import { type Post, PrismaClient } from '@prisma/client';
import { DbError } from '../errors/errors';
import { userRepository } from './userRepository';

const prisma = new PrismaClient();

export const postRepository = {
  async getAll() {
    const dbResult = await prisma.post.findMany();

    return dbResult;
  },

  async getById(id: number) {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new DbError(`Post with ID: ${id} was not found`, 404);
    }

    return post;
  },

  async create(post: Post) {
    const { authorId, text } = post;
    await userRepository.getById(authorId);

    const newPost = await prisma.post.create({
      data: { authorId, text },
    });

    return newPost;
  },

  async update(post: Post) {
    const { id, authorId, text } = post;

    const updatedPost = await prisma.post.update({
      where: { id },
      data: { authorId, text },
    });

    return updatedPost;
  },

  async delete(id: number) {
    await this.getById(id);
    const post = await prisma.post.delete({
      where: { id },
    });

    return post;
  },
};
