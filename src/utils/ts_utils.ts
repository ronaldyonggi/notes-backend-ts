import { NewNote } from '../types/note';
import { NewUser } from '../types/user';
// String type guard
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// String Parser
const parseString = (str: unknown): string => {
  if (!isString(str)) {
    throw new Error(`Invalid input: ${str}`);
  }
  return str;
};

// Boolean parser
const parseBoolean = (str: unknown): boolean => {
  if (!(typeof str === 'boolean')) {
    throw new Error(`Invalid input: ${str}`);
  }
  return str;
};

// toNewNote
const toNewNote = (object: unknown): NewNote => {
  if (!object || typeof object !== 'object') {
    throw new Error('TypeScript toNewNote error: incorrect or missing data');
  }

  if ('content' in object) {
    const newNote = {
      content: parseString(object.content),
      important: 'important' in object ? parseBoolean(object.important) : false,
    };

    return newNote;
  }

  throw new Error('TypeScript toNewNote error: invalid input data!');
};

const toNewUser = (object: unknown): NewUser => {
  if (!object || typeof object !== 'object') {
    throw new Error('TypeScript toNewUser error: incorrect or missing data');
  }

  if ('username' in object && 'name' in object && 'passwordHash' in object) {
    const newUser = {
      username: parseString(object.username),
      name: parseString(object.name),
      passwordHash: parseString(object.passwordHash)
    };

    return newUser;
  }

  throw new Error('TypeScript toNewUser error: invalid input data!');
};

export default {
  toNewNote,
  toNewUser
};