import { type Comment } from '@prisma/client';
import { commentRepository } from '../dataAcces/commentRepository';

export const commentService = {
  async like(id: number): Promise<Comment> {
    const comment = await commentRepository.getById(id);

    const likedComment = await commentRepository.update({
      ...comment,
      likes: comment.likes + 1,
    });

    return likedComment;
  },
  async dislike(id: number): Promise<Comment> {
    const comment = await commentRepository.getById(id);

    const likedComment = await commentRepository.update({
      ...comment,
      dislikes: comment.dislikes + 1,
    });

    return likedComment;
  },
};
