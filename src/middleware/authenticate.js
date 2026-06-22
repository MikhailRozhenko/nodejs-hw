import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;

  // 1. нет access token
  if (!accessToken) {
    return next(createHttpError(401, 'Missing access token'));
  }

  // 2. ищем сессию по accessToken
  const session = await Session.findOne({ accessToken });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  // 3. проверка срока access token
  if (new Date(session.accessTokenValidUntil) < new Date()) {
    return next(createHttpError(401, 'Access token expired'));
  }

  // 4. ищем пользователя
  const user = await User.findById(session.userId);

  if (!user) {
    return next(createHttpError(401));
  }

  // 5. кладём пользователя в req
  req.user = user;

  next();
};
