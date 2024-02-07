// String type guard
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};


export {
  isString,
};