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
  logger.error(error.message);

  switch (error.name){
    case 'CastError':
      return res.status(400).send({ error: 'provided id format is incorrect'});
    case 'ValidationError':
      return res.status(400).json({ error: error.message });
    default:
      return next(error);
  }
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler
};