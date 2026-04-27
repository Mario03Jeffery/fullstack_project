import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import presentationRoutes from './routes/presentationRoutes.js';
import slideRoutes from './routes/slideRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);

if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb+srv://notesTransformer:transformer123@cluster0.c8caozk.mongodb.net/?appName=notesTransformer';
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/presentations', presentationRoutes);
app.use('/api/slides', slideRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});