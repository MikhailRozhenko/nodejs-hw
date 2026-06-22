import createHttpError from 'http-errors';
import Session from '../models/session.js';

export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Invalid session');
  }

  // ❗ ПРОВЕРКА СРОКА REFRESH TOKEN
  const isRefreshExpired = new Date() > session.refreshTokenValidUntil;

  if (isRefreshExpired) {
    // 💥 ВАЖНО: удалить сессию
    await Session.deleteOne({ _id: sessionId });

    // 💥 ВАЖНО: очистить cookies
    res.clearCookie('sessionId');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    // 💥 потом ошибка
    throw createHttpError(401, 'Refresh token expired');
  }

  // дальше нормальный flow
  await Session.deleteOne({ _id: sessionId });

  const newSession = await Session.create({
    userId: session.userId,
  });

  res.cookie('sessionId', newSession._id.toString(), {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.cookie('accessToken', newSession.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 15 * 60 * 1000,
  });

  res.cookie('refreshToken', newSession.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: 'Session refreshed',
  });
};
