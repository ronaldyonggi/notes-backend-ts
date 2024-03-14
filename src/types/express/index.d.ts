export {};

declare global {
  namespace Express {
    interface Request {
      path: string
      token: string
      user
    }
  }
}