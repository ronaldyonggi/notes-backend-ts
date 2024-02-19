import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import notesRouter from './routes/noteRouter';
import usersRouter from './routes/userRouter';
import mongoose from 'mongoose';
import logger from './utils/logger';
import config from './utils/config';
import middleware from './utils/middleware';

// Initialize express app
const app  = express();

// Initiate MongoDB connection
mongoose.set('strictQuery', false);
logger.info('connecting to', config.MONGODB_URI!);
mongoose.connect(config.MONGODB_URI!)
  .then(() => logger.info('connected to MongoDB'))
  .catch((error: unknown) => {
    if (error instanceof Error) {
      logger.error('error connecting to MongoDB:', error.message);
    }
  });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use(middleware.requestLogger);

// Set up routing for notes
app.use('/api/notes', notesRouter);

// Set up routing for users
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;