import { type UserContext } from '../models/contextModel';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { setCookie } from 'hono/cookie';

export const authController = {
  async signUp(c: UserContext) {
    const userData = c.req.valid('json');
    const newUser = await userService.create(userData);

    const { id, email } = newUser;
    const tokens = await authService.generateTokens({ id, email });
    await authService.saveToken(id, tokens.refreshToken);

    const cookieMaxAge = 15 * 24 * 60 * 60 * 1000; // 15 days in ms
    setCookie(c, 'refreshToken', tokens.refreshToken, {
      maxAge: cookieMaxAge,
      httpOnly: true,
    });

    return c.json({ data: { ...tokens, user: newUser }, ok: true }, 201);
  },
  async signIn() {},
};
