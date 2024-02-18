export interface User {
  id: string,
  username: string,
  name: string,
  passwordHash: string
}

export type NewUser = Omit<User, 'id'>;