// Vercel serverless function handler
import app from '../src/server.js';
import { connectToDatabase } from '../src/config/db.js';

// Initialize database connection on cold start
let dbInitialized = false;

async function ensureDatabaseConnection() {
  if (!dbInitialized) {
    try {
      await connectToDatabase();
      dbInitialized = true;
      console.log('✅ Database connected (serverless)');
    } catch (error) {
      console.error('Failed to connect to database:', error);
      // Don't throw - let the request handle it
    }
  }
}

// Initialize database on module load
ensureDatabaseConnection().catch(console.error);

// Export the Express app for Vercel
// Vercel will automatically handle Express apps
export default app;

