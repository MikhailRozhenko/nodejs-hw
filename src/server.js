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

app.use(cors());
app.use(express.json());

app.use(logger);

const PORT = process.env.PORT ?? 3000;

app.use(notesRouter);

app.use(errors());

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
