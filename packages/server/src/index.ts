import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import generateRouter from './routers/generateRouter';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import authRouter from './routers/authRouter';
import recipeRouter from './routers/recipeRouter';
import { ServerError } from './types/server-error';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.BC_CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: 'byte-chef',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.BC_MONGODB_URI || '' }),
  })
);

//API routes
app.use('/auth', authRouter);
app.use('/generate', generateRouter);
app.use('/recipes', recipeRouter);

app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  console.log('Server error occurred.');
  err.log && console.error(err.log);

  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong.',
  });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.BC_MONGODB_URI || '');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log('Error connecting to MongoDB');
    console.error(err);
  }

  const port = process.env.BC_PORT;

  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
};

start();
