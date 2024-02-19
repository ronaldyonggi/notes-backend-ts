/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import userController from '../controllers/users';
const router = Router();

// Base router '/'
router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

export default router;