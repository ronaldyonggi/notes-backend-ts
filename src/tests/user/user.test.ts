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

afterAll(async () => {
  await mongoose.connection.close();
});
