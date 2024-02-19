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

// Validate request body to convert to object containing properties required to create a new note
const validateToNewNote = (object: unknown) => {
  if (!object || typeof object !== 'object') {
    throw new Error('TypeScript validateToNewNote error: incorrect or missing data');
  }

  if ('content' in object) {
    const newNote = {
      content: parseString(object.content),
      important: 'important' in object ? parseBoolean(object.important) : false,
    };

    return newNote;
  }

  throw new Error('TypeScript validateToNewNote error: invalid input data!');
};

const toNewUser = (object: unknown): NewUser => {
  if (!object || typeof object !== 'object') {
    throw new Error('TypeScript toNewUser error: incorrect or missing data');
  }

  if ('username' in object && 'name' in object && 'password' in object) {
    const newUser = {
      username: parseString(object.username),
      name: parseString(object.name),
      password: parseString(object.password)
    };

    return newUser;
  }

  throw new Error('TypeScript toNewUser error: invalid input data!');
};

export default {
  validateToNewNote,
  toNewUser
};
