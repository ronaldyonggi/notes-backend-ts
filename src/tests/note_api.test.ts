import mongoose from 'mongoose';
import app from '../app';
import supertest from 'supertest';
const api = supertest(app);

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


afterAll( async () => {
  await mongoose.connection.close();
});