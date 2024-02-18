import bcrypt from 'bcrypt';
import UserModel from '../../models/user';
import mongoose from 'mongoose';
import helper from './test_helper';
import api from '../app_api';

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new UserModel({
      username: 'root',
      passwordHash,
    });

    await user.save();
  });

  test('creating a new user succeeds with a username that has not been used', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    // Check if the number of uses in DB is increased at the end
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    // Check if the newly created user's username exist
    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
