import { Request, Response, NextFunction } from 'express';
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

// Catch requests that goes to all other non-existent routes
const unknownEndpoint = (_req: Request, res: Response) => {
  return res.status(404).send({
    error: 'unknown endpoint'
  });
};

