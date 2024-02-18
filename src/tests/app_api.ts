import supertest from 'supertest';
import app from '../app';
const api = supertest(app);

export default api;