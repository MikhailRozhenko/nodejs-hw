import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.patch(
  '/me/avatar',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(userController.updateUserAvatar),
);

export default router;
