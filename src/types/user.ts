export interface User {
  id: string,
  username: string,
  name: string,
  password: string
}

export type NewUser = Omit<User, 'id'>;