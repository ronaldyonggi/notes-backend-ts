import { NewNote } from '../types/note';
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
    throw new Error('Incorrect or missing data');
  }

  if ('content' in object) {
    const newNote = {
      content: parseString(object.content),
      important: 'important' in object ? parseBoolean(object.important) : false,
    };

    return newNote;
  }

  throw new Error('Invalid input data!');
};

export default toNewNote;
