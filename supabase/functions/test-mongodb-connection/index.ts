import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const mongoUri = Deno.env.get('MONGODB_URI');
    
    if (!mongoUri) {
      console.error('MONGODB_URI environment variable not set');
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'MONGODB_URI not configured',
          message: 'Please set the MONGODB_URI secret in your project settings'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string format check:', mongoUri.substring(0, 20) + '...');

    const client = new MongoClient();
    await client.connect(mongoUri);

    console.log('✅ MongoDB connection successful!');

    // Get database and test it
    const db = client.database('pharma');
    const collections = await db.listCollectionNames();
    
    console.log('Available collections:', collections);

    // Try to count documents in registrations collection
    let registrationCount = 0;
    if (collections.includes('registrations')) {
      const registrations = db.collection('registrations');
      registrationCount = await registrations.countDocuments();
      console.log('Registration documents count:', registrationCount);
    }

    client.close();

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'MongoDB connection successful!',
        database: 'pharma',
        collections: collections,
        registrationCount: registrationCount,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    
    let errorMessage = 'Unknown error';
    let errorDetails = '';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || '';
    }

    return new Response(
      JSON.stringify({ 
        success: false,
        error: errorMessage,
        details: errorDetails,
        hint: 'Check: 1) IP whitelist (0.0.0.0/0), 2) User credentials, 3) Database name in URI, 4) Password URL encoding'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
