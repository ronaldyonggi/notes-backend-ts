import mongoose from 'mongoose';
import app from '../app';
import supertest from 'supertest';
const api = supertest(app);

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

afterAll( async () => {
  await mongoose.connection.close();
});