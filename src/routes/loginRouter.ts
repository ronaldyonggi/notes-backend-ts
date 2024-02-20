/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import loginController from '../controllers/login';
const router = Router();

router.route('/')
  .post(loginController.loginUser);

export default router;