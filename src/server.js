import { errors } from 'celebrate';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import { connectMongoDB } from './db/connectMongoDB.js';

import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

import notesRouter from './routes/notesRoutes.js';

const app = express();

const PORT = process.env.PORT || 3000;

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());
app.use(logger);

/* ---------------- HEALTH CHECK ---------------- */
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API is running 🚀',
  });
});

/* ---------------- ROUTES ---------------- */
app.use('/notes', notesRouter);

/* ---------------- CELEBRATE ERRORS ---------------- */
app.use(errors());

/* ---------------- 404 ---------------- */
app.use(notFoundHandler);

/* ---------------- ERROR HANDLER ---------------- */
app.use(errorHandler);

/* ---------------- START SERVER ---------------- */
const startServer = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
