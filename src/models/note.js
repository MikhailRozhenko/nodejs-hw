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

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// индекс теперь полезнее с userId (ускоряет выборку заметок пользователя)
noteSchema.index({ userId: 1, tag: 1 });

const Note = model('Note', noteSchema);

export default Note;
