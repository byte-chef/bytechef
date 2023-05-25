import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import generateRouter from './routers/generateRouter';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.get('/greeting', (req, res) => {
  res.json({ greeting: 'Hi there!' });
});

app.use('/generate', generateRouter);

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

  app.listen(4000, () => {
    console.log('Listening on port 4000');
  });
};

start();
