import NoteModel from '../models/note';
import { ExpressParams } from '../types/expressParams';
import toNewNote from '../utils/utils';

// GET all notes
const getAllNotes =  ({res, next}: ExpressParams) => {
  NoteModel.find({})
    .then(notes => res.json(notes))
    .catch(error => next(error) );
};

// GET a specific note given id
const getNote = ({req, res, next}: ExpressParams) => {
  NoteModel.findById(req.params.id)
    .then(note => {
      note ? res.json(note) : res.status(404).json({ error: 'Cannot find note with that id'}).end()
    })
    .catch(error => next(error));
};

// CREATE a new note
const createNote = ({req, res, next}: ExpressParams) => {
  const validatedNote = toNewNote(req.body);

  const newNote = new NoteModel({
    ...validatedNote
  });

  newNote.save()
    .then(savedNote => res.json(savedNote))
    .catch(error => next(error));
};

// DELETE a note
const deleteNote = ({req, res, next}: ExpressParams) => {
  NoteModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error));
};

// UPDATE a note
const updateNote = ({req, res, next}: ExpressParams) => {
  const { content, important } = toNewNote(req.body);

  const toUpdateNote = {
    content, important
  };

  NoteModel.findByIdAndUpdate(req.params.id, toUpdateNote, {new: true})
    .then(updatedNote => res.json(updatedNote))
    .catch(error => next(error));
};

export {
  getAllNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote
};