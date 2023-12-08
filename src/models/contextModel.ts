import {
  type validateUserId,
  type validateUser,
} from '../middleware/userValidation';

export type UserIdValidationContext = typeof validateUserId;
export type UserIdContext = Parameters<UserIdValidationContext>[0];

export type UserValidationContext = typeof validateUser;
export type UserContext = Parameters<UserValidationContext>[0];
