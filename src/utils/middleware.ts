import { NextFunction, Request, Response } from 'express';
import logger from './logger';

// requestLogger middleware
const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  console.log('Method: ', req.method);
  if (req.path) {
    console.log('Path: ', req.path);
  }
  console.log('Body: ', req.body);
  console.log('---');
  next();
};

// Catch requests to non-existing routes
const unknownEndpoint = (_req: Request, res: Response) => {
  return res.status(404).send({
    error: 'unknown endpoint'
  });
};

// Error handler
const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  logger.error('Error name: ' + error.name);
  logger.error('Error message: ' + error.message);

  switch (error.name){
    case 'CastError':
      return res.status(400).send({ error: 'provided id format is incorrect'});
    case 'ValidationError':
      return res.status(400).json({ error: error.message });
    case 'MongoServerError': {
      if (error.message.includes('E11000 duplicate key error')) {
        return res.status(400).json({ error: 'expected `username` to be unique'});
      }
      return res.status(400).json({ error: error.message });
    }
    case 'JsonWebTokenError': 
      return res.status(400).json({ error: 'token missing or invalid' });
    default:
      return next(error);
  }
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler
};