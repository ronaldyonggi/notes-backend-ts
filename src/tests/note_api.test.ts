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

afterAll( async () => {
  await mongoose.connection.close();
});