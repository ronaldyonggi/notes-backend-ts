export {};

// Tells TypeScript that req object has 'path' property
declare global {
  namespace Express {
    interface Request {
      path: string;
    }
  }
}