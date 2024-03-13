/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response, Router } from 'express';
import NoteModel from '../models/note';
import ts_utils from '../utils/ts_utils';
import UserModel from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../utils/config';

const notesRouter = Router();

// GET all notes
notesRouter.get('/', async (_req: Request, res: Response ) => {
  const notes = await NoteModel
    .find({})
    .populate('user' ,{ notes: 0 });
  res.json(notes);
});

// GET a specific note given id
notesRouter.get('/:id', async (req: Request, res: Response) => {
  const matchingNote = await NoteModel.findById(req.params.id);
  matchingNote
    ? res.json(matchingNote)
    : res.status(404).json({ error: 'Cannot find note with that id'}).end();
});

// CREATE a new note
notesRouter.post('/', async (req: Request, res: Response) => {
  const validatedObject = ts_utils.validateNewNote(req.body);

  // Get token from request
  const fetchedToken = getTokenFrom(req);
  if (!fetchedToken) {
    return res.status(401).json({ error: 'token not found!'});
  }
  const decodedToken = ts_utils.validateUserForToken(jwt.verify(fetchedToken, config.SECRET as string));

  const user = await UserModel.findById(decodedToken.id);

  if (user) {
    const newNote = new NoteModel({
      content: validatedObject.content,
      important: validatedObject.important ? validatedObject.important : false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      user: user.id
    });

    const savedNote = await newNote.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();
    return res.status(201).json(savedNote);
  }

  return res.status(400).json({ error: 'user not found'});
});

// DELETE a note
// const deleteNote = (req: Request, res: Response, next: NextFunction) => {
//   NoteModel.findByIdAndDelete(req.params.id)
//     .then(() => res.status(204).end())
//     .catch(error => next(error));
// };

// UPDATE a note
// const updateNote = (req: Request, res: Response, next: NextFunction) => {
//   const { content, important } = ts_utils.toNewNote(req.body);

//   const toUpdateNote = {
//     content, important
//   };

//   NoteModel.findByIdAndUpdate(req.params.id, toUpdateNote, {new: true, runValidators: true, context: 'query' })
//     .then(updatedNote => res.json(updatedNote))
//     .catch(error => next(error));
// };

export default notesRouter;