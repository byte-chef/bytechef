import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
// import passport from 'passport';
import session from 'express-session';
import path from 'path';
import MongoStore from 'connect-mongo';
import { authenticateUser } from './controllers/authController';

dotenv.config();

import authRouter from './routers/authRouter';
// import { generateRouter } from './routers/generateRouter';
// import { recipeRouter } from './routers/recipeRouter';

const app = express();

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
app.use('/api/auth', authRouter);

// Send a 404 for any other routes requested
app.get('*', authenticateUser, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
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
