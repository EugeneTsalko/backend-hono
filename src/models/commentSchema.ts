import { z } from 'zod';
import { schemaId } from './idSchema';

export const schemaText = z.string().min(1);

export const schemaComment = z.object({
  id: schemaId,
  authorId: schemaId,
  postId: schemaId,
  createdAt: z.string(),
  likedBy: z.array(
    z.object({
      userId: schemaId,
      commentId: schemaId,
    })
  ),
  dislikedBy: z.array(
    z.object({
      userId: schemaId,
      commentId: schemaId,
    })
  ),
  text: schemaText,
});
