import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Note } from '../types/notes';
dotenv.config();

mongoose.set('strictQuery', false);

if (process.env.MONGODB_URI) {
  const url = process.env.MONGODB_URI;
  mongoose.connect(url)
    .then(() => console.log('connected to MongoDB'))
    .catch((error: unknown) => {
      let errorMessage = 'Error connecting to MongoDB!';
      if (error instanceof Error) {
        errorMessage += ` Error: ${error.message}`;
      }
      console.log(errorMessage);
    });
}

const noteSchema = new mongoose.Schema<Note>({
  content: String,
  important: Boolean
});

export default mongoose.model<Note>('Note', noteSchema);