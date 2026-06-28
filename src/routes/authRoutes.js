import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import {
  loginUser,
  refreshUserSession,
  registerUser,
  resetPasswordSchema,
} from '../controllers/authController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
} from '../validations/authValidation.js';

import { logoutUser } from '../controllers/authController.js';

const router = Router();

router.post(
  '/register',
  celebrate({
    [Segments.BODY]: registerUserSchema,
  }),
  registerUser,
);

router.post(
  '/login',
  celebrate({
    [Segments.BODY]: loginUserSchema,
  }),
  loginUser,
);

// 🔄 refresh session (cookies only, no body)
router.post('/refresh', refreshUserSession);

router.post('/logout', logoutUser);

router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(authController.requestResetEmail),
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(authController.resetPassword),
);

export default router;
