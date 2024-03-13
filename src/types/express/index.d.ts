export {};

// Tells TypeScript that req object has 'path' and 'token' property
declare global {
  namespace Express {
    interface Request {
      path: string
      token: string
    }
  }
}