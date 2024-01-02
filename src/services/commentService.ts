import { PrismaClient, type Comment } from '@prisma/client';
import { commentRepository } from '../dataAcces/commentRepository';
import { userRepository } from '../dataAcces/userRepository';

const prisma = new PrismaClient();

export const commentService = {
  async like(commentId: number, userId: number): Promise<Comment> {
    const comment = await commentRepository.getById(commentId);
    const user = await userRepository.getById(userId);

    const isAlreadyLiked = await prisma.likedComment.findFirst({
      where: {
        userId: user.id,
        commentId: comment.id,
      },
    });

    const isAlreadyDisliked = await prisma.dislikedComment.findFirst({
      where: {
        userId: user.id,
        commentId: comment.id,
      },
    });

    if (isAlreadyLiked) {
      await prisma.likedComment.delete({
        where: {
          userId_commentId: { userId, commentId },
        },
      });
    }

    if (isAlreadyDisliked) {
      await prisma.dislikedComment.delete({
        where: {
          userId_commentId: { userId, commentId },
        },
      });
    }

    if (!isAlreadyLiked) {
      await prisma.likedComment.create({
        data: { userId, commentId },
      });
    }

    return comment;
  },
  async dislike(commentId: number, userId: number): Promise<Comment> {
    const comment = await commentRepository.getById(commentId);
    const user = await userRepository.getById(userId);

    const isAlreadyLiked = await prisma.likedComment.findFirst({
      where: {
        userId: user.id,
        commentId: comment.id,
      },
    });

    const isAlreadyDisliked = await prisma.dislikedComment.findFirst({
      where: {
        userId: user.id,
        commentId: comment.id,
      },
    });

    if (isAlreadyLiked) {
      await prisma.likedComment.delete({
        where: {
          userId_commentId: { userId, commentId },
        },
      });
    }

    if (isAlreadyDisliked) {
      await prisma.dislikedComment.delete({
        where: {
          userId_commentId: { userId, commentId },
        },
      });
    }

    if (!isAlreadyDisliked) {
      await prisma.dislikedComment.create({
        data: { userId, commentId },
      });
    }

    return comment;
  },
};
