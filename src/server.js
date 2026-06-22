import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import { connectMongoDB } from './db/connectMongoDB.js';

import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

import authRoutes from './routes/authRoutes.js';
import notesRouter from './routes/notesRoutes.js';

const app = express();

const PORT = process.env.PORT || 3000;

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(logger);

/* ---------------- ROUTES ---------------- */
app.use(authRoutes);
app.use(notesRouter);

/* ---------------- HOME ---------------- */
app.get('/', (req, res) => {
  res.json({ status: 'OK' });
});

/* ---------------- ERRORS ---------------- */
app.use(errors());
app.use(notFoundHandler);
app.use(errorHandler);

/* ---------------- START ---------------- */
const start = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
};

start();
