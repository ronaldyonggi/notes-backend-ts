import { Router } from 'express';
import userController from '../controllers/users';
const router = Router();

// Base router '/'
router.route('/')
  .get(userController.getAllUsers)
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .post(userController.createUser);

export default router;