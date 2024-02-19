import { Router } from 'express';
import noteController from '../controllers/notes';
const router = Router();

// Base router '/'
router.route('/')
  .get(noteController.getAllNotes)
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .post(noteController.createNote);

// Routes with id params
router.route('/:id')
  .get(noteController.getNote)
  .put(noteController.updateNote)
  .delete(noteController.deleteNote);


export default router;