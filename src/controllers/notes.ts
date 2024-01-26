import { Request, Response, NextFunction } from 'express';
import NoteModel from '../models/note';
import toNewNote from '../../utils/notes';

// GET all notes
const getAllNotes =  (_req: Request, res: Response, next: NextFunction) => {
  NoteModel.find({})
    .then(notes => res.json(notes))
    .catch(error => next(error) );
};

// GET a specific note given id
const getNote = (req: Request, res: Response, next: NextFunction) => {
  NoteModel.findById(req.params.id)
    .then(note => {
      note ? res.json(note) : res.status(404).json({ error: 'Cannot find note with that id'}).end()
    })
    .catch(error => next(error));
};

// CREATE a new note
const createNote = (req: Request, res: Response, next: NextFunction) => {
  const validatedNote = toNewNote(req.body);

  const newNote = new NoteModel({
    ...validatedNote
  });

  newNote.save()
    .then(savedNote => res.json(savedNote))
    .catch(error => next(error));
};

// DELETE a note
const deleteNote = (req: Request, res: Response, next: NextFunction) => {
  NoteModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error));
};

// UPDATE a note
const updateNote = (req: Request, res: Response, next: NextFunction) => {
  const { content, important } = toNewNote(req.body);

  const toUpdateNote = {
    content, important
  };

  NoteModel.findByIdAndUpdate(req.params.id, toUpdateNote, {new: true})
    .then(updatedNote => res.json(updatedNote))
    .catch(error => next(error));
};

export default {
  getAllNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote
};