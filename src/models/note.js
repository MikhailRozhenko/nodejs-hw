import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // прибирає пробіли на початку та в кінці
    },

    content: {
      type: String,
      trim: true, // прибирає пробіли на початку та в кінці
      default: '', // за замовчуванням порожній рядок
    },

    tag: {
      type: String,
      default: 'Todo',
      trim: true, // прибирає пробіли на початку та в кінці
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',
      ], // обмежує можливі значення тегу
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Note = model('Note', noteSchema);
export default Note;
