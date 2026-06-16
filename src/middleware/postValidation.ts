import { type Post } from '@prisma/client';
import { validator } from 'hono/validator';
import { schemaAuthorId, schemaText } from '../models/postSchema';
import { ValidationError } from '../errors/errors';

export const validatePost = validator('json', (value) => {
  const { id, authorId, text, createdAt }: Post = value;
  const parsedAuthorId = schemaAuthorId.safeParse(authorId);
  const parsedText = schemaText.safeParse(text);

  if (!parsedAuthorId.success) {
    throw new ValidationError('Author ID must be a number');
  }

  if (!parsedText.success) {
    throw new ValidationError('Post text must be non-empty string');
  }

  return { id, authorId, text, createdAt };
});
