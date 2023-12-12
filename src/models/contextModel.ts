import { type validateId } from '../middleware/idValidation';
import { type validatePost } from '../middleware/postValidation';
import { type validateUser } from '../middleware/userValidation';

export type IdValidationContext = typeof validateId;
export type IdContext = Parameters<IdValidationContext>[0];

export type UserValidationContext = typeof validateUser;
export type UserContext = Parameters<UserValidationContext>[0];

export type PostValidationContext = typeof validatePost;
export type PostContext = Parameters<PostValidationContext>[0];
