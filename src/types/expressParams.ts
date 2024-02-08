import { NextFunction, Request, Response } from 'express';

export interface ExpressParams {
  req: Request;
  res: Response;
  next: NextFunction;
  error: Error;
}