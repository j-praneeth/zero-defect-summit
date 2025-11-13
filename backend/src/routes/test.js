import express from 'express';
import { getDatabase } from '../config/db.js';

const router = express.Router();

// Test MongoDB connection (equivalent to test-mongodb-connection Supabase function)
router.get('/mongodb', async (req, res) => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('MONGODB_URI environment variable not set');
      return res.status(500).json({
        success: false,
        error: 'MONGODB_URI not configured',
        message: 'Please set the MONGODB_URI environment variable'
      });
    }

    console.log('Testing MongoDB connection...');

    // Get database connection
    const db = await getDatabase();
    
    console.log('✅ MongoDB connection successful!');

    // List all collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    console.log('Available collections:', collectionNames);

    // Count documents in registrations collection
    let registrationCount = 0;
    if (collectionNames.includes('registrations')) {
      const registrations = db.collection('registrations');
      registrationCount = await registrations.countDocuments();
      console.log('Registration documents count:', registrationCount);
      
      // Get a sample registration (without sensitive data)
      const sampleReg = await registrations.findOne({}, {
        projection: { 
          _id: 1, 
          company: 1, 
          payment_status: 1, 
          createdAt: 1 
        }
      });

      return res.status(200).json({
        success: true,
        message: 'MongoDB connection successful!',
        database: 'pharma',
        collections: collectionNames,
        registrationCount: registrationCount,
        sampleRegistration: sampleReg,
        timestamp: new Date().toISOString()
      });
    }

    res.status(200).json({
      success: true,
      message: 'MongoDB connection successful!',
      database: 'pharma',
      collections: collectionNames,
      registrationCount: 0,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ MongoDB connection test failed:', error);
    
    let errorMessage = 'Unknown error';
    let errorDetails = '';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || '';
    }

    res.status(500).json({
      success: false,
      error: errorMessage,
      details: errorDetails,
      hint: 'Check: 1) IP whitelist (0.0.0.0/0), 2) User credentials, 3) Database name in URI, 4) Password URL encoding'
    });
  }
});

// Test endpoint for checking all database indexes
router.get('/mongodb/indexes', async (req, res) => {
  try {
    const db = await getDatabase();
    const registrations = db.collection('registrations');
    
    const indexes = await registrations.indexes();
    
    res.status(200).json({
      success: true,
      collection: 'registrations',
      indexes: indexes,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching indexes:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Create recommended indexes
router.post('/mongodb/create-indexes', async (req, res) => {
  try {
    const db = await getDatabase();
    const registrations = db.collection('registrations');
    
    // Create indexes similar to PostgreSQL schema
    const emailIndex = await registrations.createIndex({ email: 1 });
    const razorpayIndex = await registrations.createIndex(
      { razorpay_payment_id: 1 }, 
      { unique: true, sparse: true }
    );
    const createdAtIndex = await registrations.createIndex({ createdAt: -1 });
    
    console.log('✅ Indexes created successfully');

    res.status(200).json({
      success: true,
      message: 'Indexes created successfully',
      indexes: {
        email: emailIndex,
        razorpay_payment_id: razorpayIndex,
        createdAt: createdAtIndex
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error creating indexes:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;

