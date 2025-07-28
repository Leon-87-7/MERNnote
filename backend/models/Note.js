import mongoose from 'mongoose';

// 1st step: You need to create a schema
// 2nd step: You would create a model based off of that schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      index: true, // Add index for better query performance
    },
  },
  { timestamps: true } // mongoDB giving us createdAt, updatedAt
);

const Note = mongoose.model('Note', noteSchema);

export default Note;
