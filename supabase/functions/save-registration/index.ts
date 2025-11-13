import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

// Simple in-memory rate limiting (resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 requests
const RATE_WINDOW = 3600000; // 1 hour in ms

// Validation regex patterns
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

interface RegistrationData {
  name: string;
  email: string;
  mobile: string;
  company: string;
  department?: string;
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  payment_status?: string;
}

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
    // Rate limiting check
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const rateLimitData = rateLimitMap.get(clientIp);

    if (rateLimitData) {
      if (now < rateLimitData.resetTime) {
        if (rateLimitData.count >= RATE_LIMIT) {
          console.warn(`Rate limit exceeded for IP: ${clientIp}`);
          return new Response(
            JSON.stringify({ error: 'Too many registration attempts. Please try again later.' }),
            { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        rateLimitData.count++;
      } else {
        rateLimitData.count = 1;
        rateLimitData.resetTime = now + RATE_WINDOW;
      }
    } else {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_WINDOW });
    }

    const body = await req.json() as RegistrationData;
    const { name, email, mobile, department, company, razorpay_payment_id, razorpay_order_id, payment_status } = body;

    // Validate required fields
    if (!name || !email || !mobile || !company) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate field formats and lengths
    if (name.trim().length < 2 || name.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Invalid name format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!EMAIL_REGEX.test(email) || email.length > 255) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!INDIAN_MOBILE_REGEX.test(mobile)) {
      return new Response(
        JSON.stringify({ error: 'Invalid mobile number format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (company.trim().length < 2 || company.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Invalid company name format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (department && department.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Department name too long' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Connect to MongoDB
    const mongoUri = Deno.env.get('MONGODB_URI');
    if (!mongoUri) {
      console.error('MONGODB_URI not configured');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable. Please try again later.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const client = new MongoClient();
    await client.connect(mongoUri);

    // Get database and collection - explicitly specify database name
    const db = client.database('pharma');
    const registrations = db.collection('registrations');

    // Check for duplicate registration (same email within last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingReg = await registrations.findOne({
      email: email.toLowerCase(),
      createdAt: { $gte: oneDayAgo }
    });

    if (existingReg) {
      client.close();
      console.warn(`Duplicate registration attempt for email: ${email}`);
      return new Response(
        JSON.stringify({ error: 'A registration with this email already exists. Please contact support if you need assistance.' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert registration data
    const registration = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      mobile,
      department: department?.trim() || null,
      company: company.trim(),
      razorpay_payment_id: razorpay_payment_id || null,
      razorpay_order_id: razorpay_order_id || null,
      payment_status: payment_status || 'pending',
      createdAt: new Date(),
    };

    const result = await registrations.insertOne(registration);
    
    console.log('Registration saved successfully', { 
      id: result.toString(),
      email: email.toLowerCase(),
      payment_status: payment_status || 'pending'
    });

    // Close connection
    client.close();

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Registration saved successfully',
        id: result.toString()
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error saving registration:', error);
    return new Response(
      JSON.stringify({ error: 'Registration failed. Please try again or contact support if the problem persists.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
