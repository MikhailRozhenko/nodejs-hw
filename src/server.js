import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import authRouter from './routes/authRoutes.js';
import notesRouter from './routes/notesRoutes.js';
import userRouter from './routes/userRoutes.js';

import { errors } from 'celebrate';

import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

import { connectMongoDB } from './db/connectMongoDB.js';

const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use(authRouter);
app.use(userRouter);
app.use(notesRouter);

// 404 handler
app.use(notFoundHandler);

// celebrate errors
app.use(errors());

// ⚠️ ВАЖНО: это ДОЛЖНО быть последним вообще
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

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
