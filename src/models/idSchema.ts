import { z } from 'zod';

export const schemaId = z.coerce.number().min(0);
