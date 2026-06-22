import createHttpError from 'http-errors';
import Session from '../models/session.js';
import User from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { accessToken, sessionId } = req.cookies;

  // 1. проверка обоих токенов
  if (!accessToken || !sessionId) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  // 2. поиск сессии по ОБОИМ полям
  const session = await Session.findOne({
    _id: sessionId,
    accessToken,
  });

  if (!session) {
    return next(createHttpError(401, 'Invalid session'));
  }

  // 3. проверка срока жизни сессии
  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Session expired'));
  }

  // 4. получаем пользователя
  const user = await User.findById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }

  // 5. кладём в req
  req.user = user;
  req.session = session;

  next();
};
