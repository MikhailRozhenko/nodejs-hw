import createHttpError from 'http-errors';
import Note from '../models/note.js';

/* ---------------- CREATE ---------------- */
export const createNote = async (req, res) => {
  const { title, content, tag } = req.body;

  const note = await Note.create({
    title,
    content,
    tag,
    userId: req.user._id,
  });

  res.status(201).json(note);
};

/* ---------------- GET ALL (WITH PAGINATION + FILTER) ---------------- */
export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, search = '', tag } = req.query;

  const filter = {
    userId: req.user._id,
  };

  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

  if (tag) {
    filter.tag = tag;
  }

  const skip = (page - 1) * perPage;

  const [notes, totalNotes] = await Promise.all([
    Note.find(filter).skip(skip).limit(perPage),
    Note.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages,
    notes,
  });
};

/* ---------------- GET BY ID ---------------- */
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOne({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.json(note);
};

/* ---------------- UPDATE ---------------- */
export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const updatedNote = await Note.findOneAndUpdate(
    { _id: noteId, userId: req.user._id },
    req.body,
    { returnDocument: 'after' }, // ✅ FIXED
  );

  if (!updatedNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.json(updatedNote);
};

/* ---------------- DELETE ---------------- */
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const deletedNote = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id,
  });

  if (!deletedNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(deletedNote); // ✅ FIXED (NOT 204)
};
