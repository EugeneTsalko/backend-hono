import { type UserContext } from '../models/contextModel';
import { authService } from '../services/authService';
import { setCookie } from 'hono/cookie';

const cookieMaxAge = 15 * 24 * 60 * 60 * 1000; // 15 days in ms

export const authController = {
  async signUp(c: UserContext) {
    const userData = c.req.valid('json');

    const newUser = await authService.signUp(userData);

    setCookie(c, 'refreshToken', newUser.refreshToken, {
      maxAge: cookieMaxAge,
      httpOnly: true,
    });

    return c.json({ data: newUser, ok: true }, 201);
  },

  async signIn(c: UserContext) {
    const { email, password } = c.req.valid('json');

    const userData = await authService.signIn({ email, password });

    setCookie(c, 'refreshToken', userData.refreshToken, {
      maxAge: cookieMaxAge,
      httpOnly: true,
    });

    return c.json({ data: { userData }, ok: true }, 201);
  },
};
