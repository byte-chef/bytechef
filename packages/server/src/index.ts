import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import path from 'path';
import MongoStore from 'connect-mongo';

dotenv.config();

import { authRouter } from './routers/authRouter';
// import { generateRouter } from './routers/generateRouter';
// import { recipeRouter } from './routers/recipeRouter';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

//API routes
app.use('/api/auth', authRouter);

// Send a 404 for any other routes requested
app.get('*', authenticateUser, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname), '../client/index.html');
});

const start = async () => {
  try {
    await mongoose.connect(process.env.BC_MONGODB_URI || '');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log('Error connecting to MongoDB');
    console.error(err);
  }

  app.listen(4000, () => {
    console.log('Listening on port 4000');
  });
};

start();
