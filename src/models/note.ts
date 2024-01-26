import mongoose from 'mongoose';
import { Note } from '../types/notes';

const noteSchema = new mongoose.Schema<Note>({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  important: Boolean
});

export default mongoose.model<Note>('Note', noteSchema);