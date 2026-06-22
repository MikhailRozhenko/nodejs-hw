import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import {
  loginUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';
import {
  loginUserSchema,
  registerUserSchema,
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

export default router;
