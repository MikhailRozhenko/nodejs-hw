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

// 🔒 protect all routes
router.use(authenticate);

// GET all notes
router.get('/', celebrate(getAllNotesSchema), getAllNotes);

// GET note by id
router.get('/:noteId', celebrate(noteIdSchema), getNoteById);

// CREATE note
router.post('/', celebrate(createNoteSchema), createNote);

// DELETE note
router.delete('/:noteId', celebrate(noteIdSchema), deleteNote);

// UPDATE note
router.patch('/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
