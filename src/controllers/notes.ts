import { NextFunction, Request, Response } from 'express';
import NoteModel from '../models/note';
import ts_utils from '../utils/ts_utils';
import UserModel from '../models/user';

// GET all notes
const getAllNotes = async (_req: Request, res: Response ) => {
  const notes = await NoteModel
    .find({})
    .populate('user' ,{ notes: 0 });
  res.json(notes);
};

// GET a specific note given id
const getNote = (req: Request, res: Response, next: NextFunction) => {
  NoteModel.findById(req.params.id)
    .then(note => {
      note ? res.json(note) : res.status(404).json({ error: 'Cannot find note with that id'}).end();
    })
    .catch(error => next(error));
};

// CREATE a new note
const createNote = async (req: Request, res: Response) => {
  const {content, important, userId} = ts_utils.validateToNewNote(req.body);

  const user = await UserModel.findById(userId);

  if (user) {
    const newNote = new NoteModel({
      content,
      important: important ? false: important,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      user: user.id
    });

    const savedNote = await newNote.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();
    return res.status(201).json(savedNote);
  }

  return res.status(400).json({ error: 'user not found'});

};

// DELETE a note
const deleteNote = (req: Request, res: Response, next: NextFunction) => {
  NoteModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error));
};

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

export default {
  getAllNotes,
  getNote,
  createNote,
  deleteNote,
  // updateNote
};