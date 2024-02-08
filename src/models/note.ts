import mongoose from 'mongoose';
import { Note } from '../types/note';

const noteSchema = new mongoose.Schema<Note>({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (_document, returnedObject: Record<string, string>) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model<Note>('Note', noteSchema);