import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import generateRouter from './routers/generateRouter';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import MongoStore from 'connect-mongo';
import { authenticateUser } from './controllers/authController';
import recipeRouter from './routers/recipeRouter';

dotenv.config();

import authRouter from './routers/authRouter';
// import { generateRouter } from './routers/generateRouter';
// import { recipeRouter } from './routers/recipeRouter';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
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

app.use(cors({ origin: 'process.env.BC_CLIENT_URL', credentials: true }));

//API routes
app.use('/auth', authRouter);
app.use('/generate', generateRouter);
app.use('/recipes', recipeRouter);

app.use((err: any, req: any, res: any, next: any) => {
  console.log('Error handler triggered.');
  console.error(err.log);

  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong.',
  });
});

app.use((err: any, req: any, res: any, next: any) => {
  console.log('Error handler triggered.');
  console.error(err.log);

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
