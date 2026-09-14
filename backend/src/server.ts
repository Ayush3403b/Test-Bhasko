import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import connectDB from './database/connection';
import leadsRouter from './routes/leads';
import calculateRouter from './routes/calculate';
import seedRouter from './routes/seed';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.CLIENT_URL,
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') || // Allow all Vercel previews/deployments
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }
    return callback(null, true); // Allow any origin or restrict as desired
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Request logger in dev
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });
}

// Health check
app.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Bhasko Solar API Server',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', db: 'ready', uptime: process.uptime() });
});

// API Routes
app.use('/api/leads', leadsRouter);
app.use('/api/calculate', calculateRouter);
app.use('/api/seed', seedRouter);

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'Internal server error', details: err?.message });
});

// Start Server & Connect Database
async function startServer() {
  try {
    await connectDB();
    console.log(' connected to MongoDB successfully.');
  } catch (err) {
    console.warn('⚠️ Warning: MongoDB connection pending or failed on startup:', err);
  }

  app.listen(PORT, () => {
    console.log(` Bhasko Backend API Server running on port ${PORT}`);
    console.log(` Health check available at: http://localhost:${PORT}/api/health`);
  });
}

startServer();

export default app;
