import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db.js';
import registrationRoutes from './routes/registration.js';
import razorpayRoutes from './routes/razorpay.js';
import testRoutes from './routes/test.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - CORS configuration
// In development, allow all localhost origins for flexibility
// In production, use the specific FRONTEND_URL
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow all localhost origins
    if (process.env.NODE_ENV !== 'production') {
      if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return callback(null, true);
      }
    }
    
    // Default allowed origins (production frontend URLs)
    const defaultOrigins = [
      'http://localhost:5173', 
      'http://localhost:8080',
      'https://zero-defect-summit.vercel.app'
    ];
    
    // In production, use the configured FRONTEND_URL or default origins
    const allowedOrigins = process.env.FRONTEND_URL 
      ? process.env.FRONTEND_URL.split(',').map(url => url.trim().replace(/\/$/, ''))
      : defaultOrigins;
    
    // Normalize origin (remove trailing slash for comparison)
    const normalizedOrigin = origin.replace(/\/$/, '');
    
    if (allowedOrigins.includes(normalizedOrigin) || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-razorpay-signature']
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api/registration', registrationRoutes);
app.use('/api/razorpay', razorpayRoutes);
app.use('/api/test', testRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Initialize database connection
let dbConnected = false;
async function initializeDatabase() {
  if (!dbConnected) {
    try {
      await connectToDatabase();
      dbConnected = true;
      console.log('✅ Database connected');
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  }
}

// Start server (for local development)
async function startServer() {
  try {
    await initializeDatabase();
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📡 API endpoint: http://localhost:${PORT}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Export app for serverless (Vercel)
export default app;

// Start server only if running directly (not imported as a module)
// Check if this file is being run directly
const isMainModule = process.argv[1] && process.argv[1].endsWith('server.js');
if (isMainModule && process.env.VERCEL !== '1') {
  startServer();
}

