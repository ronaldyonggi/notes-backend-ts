import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app  = express();

app.use(express.json());

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
  const id  = Number(req.params.id);
  const matchedNote = notes.find(note => note.id === id);
  if (matchedNote) {
    return res.json(matchedNote);
  } else {
    return res.status(404).end();
  }
});

// DELETE a note
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  // Update notes
  notes = notes.filter(note => note.id !== id);
  return res.status(204).end();
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});