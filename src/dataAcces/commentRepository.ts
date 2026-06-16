import { type Comment, PrismaClient } from '@prisma/client';
import { DbError } from '../errors/errors';
import { userRepository } from './userRepository';
import { postRepository } from './postRepository';

const prisma = new PrismaClient();

export const commentRepository = {
  async getAll() {
    const dbResult = await prisma.comment.findMany({
      include: {
        likedBy: true,
        dislikedBy: true,
      },
    });

    return dbResult;
  },

  async getById(id: number) {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        likedBy: true,
        dislikedBy: true,
      },
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
    const { id, authorId, postId, text } = comment;
    await this.getById(id);

    if (authorId) {
      await userRepository.getById(authorId);
    }

    if (postId) {
      await postRepository.getById(postId);
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { authorId, postId, text },
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
