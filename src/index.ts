import * as dotenv from 'dotenv';
dotenv.config();

// Make sure to import Request, Response, and NextFunction from express
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import toNewNote from '../utils/notes';
import NoteModel from './models/note';
const app  = express();

app.use(express.json());
app.use(cors());


// requestLogger middleware
const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  console.log('Method: ', req.method);
  if (req.path) {
    console.log('Path: ', req.path);
  }
  console.log('Body: ', req.body);
  console.log('---');
  next();
};

app.use(requestLogger);

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
];

// GET home page
app.get('/', (_req, res) => {
  return res.send('<h1>Hello World!</h1>');
});

// GET all notes
app.get('/api/notes', (_req, res) => {
  return res.json(notes);
});

// GET a single note
app.get('/api/notes/:id', (req, res) => {
  NoteModel.findById(req.params.id)
    .then(note => res.json(note))
    .catch((error: unknown) => {
      if (error instanceof Error) {
        throw new Error('Error fetching a note!');
      }
    });
});

// DELETE a note
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  // Update notes
  notes = notes.filter(note => note.id !== id);
  return res.status(204).end();
});


// CREATE a note
app.post('/api/notes', (req, res) => {
  const validatedNote = toNewNote(req.body);

  const newNote = new NoteModel({
    ...validatedNote
  });

  newNote
    .save()
    .then(savedNote => {
      return res.json(savedNote);
    })
    .catch((error: unknown) => {
      let errorMessage = 'Something went wrong!';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      return res.status(400).send(errorMessage);
    });
});


// Catch request to all other non-existent routes
const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({
    error: 'unknown endpoint'
  });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});