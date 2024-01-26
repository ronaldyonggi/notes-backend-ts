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
