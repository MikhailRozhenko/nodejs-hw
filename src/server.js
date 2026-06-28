import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import authRouter from './routes/authRoutes.js';
import notesRouter from './routes/notesRoutes.js';
import userRouter from './routes/userRoutes.js';

import { errors } from 'celebrate';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

import { connectMongoDB } from './db/connectMongoDB.js';

const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use(authRouter);
app.use(userRouter);
app.use(notesRouter);

// 404 — строго после роутов
app.use(notFoundHandler);

// errors — последний
app.use(errors());

const PORT = process.env.PORT || 3000;

// DB + server start
connectMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
