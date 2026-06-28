import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

import { errors } from 'celebrate';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use(authRouter);
app.use(userRouter);

// 404
app.use(notFoundHandler);

// errors LAST
app.use(errors());

const PORT = process.env.PORT || 3000;

// 👉 прямое подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB error:', err);
    process.exit(1);
  });
