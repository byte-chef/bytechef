import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.get('/greeting', (req, res) => {
  res.json({ greeting: 'Hi there!' });
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
