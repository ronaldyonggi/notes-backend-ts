import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/user';
import ts_utils from '../utils/ts_utils';

// GET all users
const getAllUsers = async (_req: Request, res: Response) => {
  const users = await UserModel.find({}).populate('notes');
  res.json(users);
};

// CREATE a new user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, name, password } = ts_utils.toNewUser(req.body);
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new UserModel({
    username, name, passwordHash
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch(error) {
    next(error);
  }

};

export default {
  getAllUsers,
  createUser
};