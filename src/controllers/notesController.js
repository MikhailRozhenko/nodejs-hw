import createHttpError from 'http-errors';
import Note from '../models/note.js';

// CREATE
export const createNote = async (req, res) => {
  const { title, content } = req.body;

  const note = await Note.create({
    title,
    content,
    userId: req.user._id, // 👈 важно
  });

  res.status(201).json(note);
};

// GET ALL (только текущий пользователь)
export const getAllNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.user._id });

  res.status(200).json(notes);
};

// GET BY ID (и проверка владельца)
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOne({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

// UPDATE (только своя заметка)
export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      userId: req.user._id,
    },
    req.body,
    { new: true },
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

// DELETE (только своя заметка)
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.sendStatus(204);
};
