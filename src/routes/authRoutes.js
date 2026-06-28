import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import * as authController from '../controllers/authController.js';
import { validateBody } from '../middleware/validateBody.js';

import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';

const router = Router();

// REGISTER
router.post(
  '/register',
  celebrate({
    [Segments.BODY]: registerUserSchema,
  }),
  authController.registerUser,
);

// LOGIN
router.post(
  '/login',
  celebrate({
    [Segments.BODY]: loginUserSchema,
  }),
  authController.loginUser,
);

// REFRESH
router.post('/refresh', authController.refreshUserSession);

// LOGOUT
router.post('/logout', authController.logoutUser);

// REQUEST RESET EMAIL
router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  authController.requestResetEmail,
);

// RESET PASSWORD
router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  authController.resetPassword,
);

export default router;
