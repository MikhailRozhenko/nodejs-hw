import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      trim: true,
      default: '',
    },

    tag: {
      type: String,
      default: 'Todo',
      trim: true,
      enum: TAGS,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

noteSchema.index({ tag: 1 });

const Note = model('Note', noteSchema);

export default Note;
