import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

import { errors } from 'celebrate';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

import connectDB from './db/connectDB.js';

const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use(authRouter);
app.use(userRouter);

// 404 — ВАЖНО СРАЗУ ПОСЛЕ РОУТОВ
app.use(notFoundHandler);

// ERROR HANDLER — ПОСЛЕДНИЙ
app.use(errors());

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
    process.exit(1);
  });
