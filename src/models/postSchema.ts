import { z } from 'zod';
import { schemaId } from './idSchema';

export const schemaAuthorId = schemaId;

export const schemaText = z.string().min(1);

export const schemaPost = z.object({
  authorId: schemaAuthorId,
  text: schemaText,
});
