import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app  = express();

const notes = [
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});