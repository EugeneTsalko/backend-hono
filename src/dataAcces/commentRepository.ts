import { type Comment, PrismaClient } from '@prisma/client';
import { DbError } from '../errors/errors';
import { userRepository } from './userRepository';
import { postRepository } from './postRepository';

const prisma = new PrismaClient();

export const commentRepository = {
  async getAll() {
    const dbResult = await prisma.comment.findMany();

    return dbResult;
  },

  async getById(id: number) {
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new DbError(`Comment with ID: ${id} was not found`, 404);
    }

    return comment;
  },

  async create(comment: Comment) {
    const { authorId, postId, text } = comment;
    await userRepository.getById(authorId);
    await postRepository.getById(postId);

    const newComment = await prisma.comment.create({
      data: { authorId, postId, text },
    });

    return newComment;
  },

  async update(comment: Comment) {
    const { id, authorId, postId, text, likes, dislikes } = comment;

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { authorId, postId, text, likes, dislikes },
    });

    return updatedComment;
  },

  async delete(id: number) {
    await this.getById(id);
    const comment = await prisma.comment.delete({
      where: { id },
    });

    return comment;
  },
};
