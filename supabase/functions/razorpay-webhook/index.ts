import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { MongoClient } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-razorpay-signature',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get('x-razorpay-signature');
    const body = await req.text();
    
    // Verify Razorpay signature
    const webhookSecret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET');
    if (!webhookSecret) {
      console.error('RAZORPAY_WEBHOOK_SECRET not configured');
      return new Response(JSON.stringify({ error: 'Configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Verify webhook signature
    const expectedSignature = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(body + webhookSecret)
    );
    const expectedSignatureHex = Array.from(new Uint8Array(expectedSignature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    if (signature !== expectedSignatureHex) {
      console.warn('Invalid webhook signature');
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const event = JSON.parse(body);
    console.log('Razorpay webhook event:', event.event);

    // Handle payment success
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const { id: payment_id, order_id, amount, email, contact } = payment;

      console.log('Payment captured:', { payment_id, order_id, email });

      // Get order details from sessionStorage equivalent (metadata)
      const notes = payment.notes || {};

      // Connect to MongoDB and save registration
      const mongoUri = Deno.env.get('MONGODB_URI');
      if (!mongoUri) {
        throw new Error('MONGODB_URI not configured');
      }

      const client = new MongoClient();
      await client.connect(mongoUri);

      try {
        const db = client.database('pharma');
        const registrations = db.collection('registrations');

        // Save the registration with payment confirmation
        const registration = {
          name: notes.name || '',
          email: email || notes.email || '',
          mobile: contact || notes.mobile || '',
          department: notes.department || null,
          company: notes.company || '',
          razorpay_payment_id: payment_id,
          razorpay_order_id: order_id,
          payment_status: 'completed',
          amount: amount / 100, // Razorpay amounts are in paise
          createdAt: new Date(),
        };

        await registrations.insertOne(registration);
        console.log('Registration saved after payment:', { email, payment_id });

      } finally {
        client.close();
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: 'Webhook processing failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
