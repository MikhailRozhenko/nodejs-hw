import { Router, celebrate } from 'celebrate';

import * as authController from '../controllers/authController.js';

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
  celebrate({ body: registerUserSchema }),
  authController.registerUser,
);

// LOGIN
router.post(
  '/login',
  celebrate({ body: loginUserSchema }),
  authController.loginUser,
);

// REFRESH
router.post('/refresh', authController.refreshUserSession);

// LOGOUT
router.post('/logout', authController.logoutUser);

// REQUEST RESET EMAIL
router.post(
  '/request-reset-email',
  celebrate({ body: requestResetEmailSchema }),
  authController.requestResetEmail,
);

// RESET PASSWORD
router.post(
  '/reset-password',
  celebrate({ body: resetPasswordSchema }),
  authController.resetPassword,
);

export default router;
