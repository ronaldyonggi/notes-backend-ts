import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
});

// Modify how the object is returned when users are fetched
userSchema.set('toJSON', {
  transform: (_document, returnedObject: Record<string, string>) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // passwordHash should not be visible 
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);
export default User;