import { type UserContext } from '../models/contextModel';
import { userController } from './userController';

export const authController = {
  async signUp(c: UserContext) {
    const response = await userController.create(c);

    return response;
  },
  async signIn() {},
};
