import { celebrate } from 'celebrate';
import { Router } from 'express';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// 🔒 защита всех routes
router.use(authenticate);

// GET all notes
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

// GET note by id
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

// CREATE note
router.post('/notes', celebrate(createNoteSchema), createNote);

// DELETE note
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

// UPDATE note
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
