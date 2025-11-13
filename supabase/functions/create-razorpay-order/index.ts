import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RAZORPAY_API = 'https://api.razorpay.com/v1';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, mobile, company, department } = await req.json();

    // Get Razorpay credentials
    const keyId = Deno.env.get('RAZORPAY_KEY_ID');
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!keyId || !keySecret) {
      console.error('Razorpay credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Payment system not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate amount (35000 + 18% GST = 41300)
    const baseAmount = 35000;
    const gstAmount = baseAmount * 0.18;
    const totalAmount = Math.round((baseAmount + gstAmount) * 100); // Convert to paise

    // Create Razorpay order
    const orderData = {
      amount: totalAmount,
      currency: 'INR',
      notes: {
        name,
        email,
        mobile,
        company,
        department: department || '',
      },
    };

    const authString = btoa(`${keyId}:${keySecret}`);
    const response = await fetch(`${RAZORPAY_API}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Razorpay order creation failed:', error);
      throw new Error('Failed to create payment order');
    }

    const order = await response.json();
    console.log('Razorpay order created:', order.id);

    return new Response(
      JSON.stringify({
        order_id: order.id,
        amount: totalAmount,
        currency: 'INR',
        key_id: keyId,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error creating order:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create payment order. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
