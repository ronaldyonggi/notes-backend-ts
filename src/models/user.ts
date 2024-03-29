import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // ensure usernames are unique (no duplicate usernames)
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
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