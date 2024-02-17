import mongoose from 'mongoose';
import app from '../app';
import supertest from 'supertest';
import NoteModel from '../models/note';
import { Note } from '../types/note';
const api = supertest(app);

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
];

beforeEach(async () => {
  await NoteModel.deleteMany({});
  let noteObject = new NoteModel(initialNotes[0]);
  await noteObject.save();
  noteObject = new NoteModel(initialNotes[1]);
  await noteObject.save();
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('there are two notes', async () => {
  const res = await api.get('/api/notes')
  expect(res.body).toHaveLength(2);
}, 100000);

test('the first note is about HTTP methods', async () => {
  const res = await api.get('/api/notes')
  expect(res.body[0].content).toBe('HTML is easy');
}, 100000);

test('The number of notes returned in DB matches the number of notes in initialNotes', async () => {
  const res = await api.get('/api/notes');
  expect(res.body).toHaveLength(initialNotes.length);
});

test('a specific note is present within the returned notes', async () => {
  const res = await api.get('/api/notes');
  const contents: Array<Note['content']> = res.body.map((r : Note) => r.content);
  expect(contents).toContain('Browser can execute only JavaScript');
});

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const res = await api.get('/api/notes');
  const contents = res.body.map((r: Note) => r.content);

  expect(res.body).toHaveLength(initialNotes.length + 1);
  expect(contents).toContain('async/await simplifies making async calls');
});

afterAll( async () => {
  await mongoose.connection.close();
});