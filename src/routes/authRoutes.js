import pkg from 'celebrate';
import { Router } from 'express';

import * as authController from '../controllers/authController.js';

import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';

const { celebrate, Segments } = pkg;

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
  celebrate({
    [Segments.BODY]: requestResetEmailSchema,
  }),
  authController.requestResetEmail,
);

// RESET PASSWORD
router.post(
  '/reset-password',
  celebrate({
    [Segments.BODY]: resetPasswordSchema,
  }),
  authController.resetPassword,
);

export default router;
