import { type Comment } from '@prisma/client';
import { validator } from 'hono/validator';
import { schemaText } from '../models/postSchema';
import { ValidationError } from '../errors/errors';
import { schemaId } from '../models/idSchema';

export const validateComment = validator('json', (value) => {
  const { id, authorId, text, createdAt, postId, likes, dislikes }: Comment =
    value;
  const parsedAuthorId = schemaId.safeParse(authorId);
  const parsedPostId = schemaId.safeParse(postId);
  const parsedText = schemaText.safeParse(text);

  if (!parsedAuthorId.success) {
    throw new ValidationError('Author ID must be a number');
  }

  if (!parsedPostId.success) {
    throw new ValidationError('Post ID must be a number');
  }

  if (!parsedText.success) {
    throw new ValidationError('Comment text must be non-empty string');
  }

  return { id, authorId, postId, text, createdAt, likes, dislikes };
});
