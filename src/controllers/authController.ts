import { type AuthContext } from '../models/contextModel';
import { authService } from '../services/authService';

export const authController = {
  async signUp(c: AuthContext) {
    const userData = c.req.valid('form');

    const newUser = await authService.signUp(userData);

    return c.json({ data: newUser, ok: true }, 201);
  },

  async signIn(c: AuthContext) {
    const { email, password } = c.req.valid('form');

    const userData = await authService.signIn({ email, password });

    return c.json(userData.token);
  },
};
