import createHttpError from 'http-errors';
import Note from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { tag, search } = req.query;

  const page = Number(req.query.page);
  const perPage = Number(req.query.perPage);
  const skip = (page - 1) * perPage;

  const notesQuery = Note.find();
  const countQuery = Note.find();

  if (tag) {
    notesQuery.where('tag').equals(tag);
    countQuery.where('tag').equals(tag);
  }

  if (search) {
    const searchQuery = {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    };

    notesQuery.where(searchQuery);
    countQuery.where(searchQuery);
  }

  const [notes, totalNotes] = await Promise.all([
    notesQuery.skip(skip).limit(perPage),
    countQuery.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);

  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findByIdAndDelete(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    returnDocument: 'after',
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};
