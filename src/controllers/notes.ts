import { Request, Response, NextFunction } from 'express';
import NoteModel from '../models/note';
import toNewNote from '../../utils/notes';

// GET all notes
const getAllNotes =  (_req: Request, res: Response, next: NextFunction) => {
  NoteModel.find({})
    .then(notes => res.json(notes))
    .catch(error => next(error) );
};
