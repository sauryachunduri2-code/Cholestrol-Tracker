import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDB } from './db/schema.js';
import routes from './routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server running' });
});

// Initialize database and start server
async function start() {
  try {
    await initializeDB();
    console.log('Database initialized');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
