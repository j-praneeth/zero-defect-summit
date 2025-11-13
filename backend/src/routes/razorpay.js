import express from 'express';
import crypto from 'crypto';
import { getDatabase } from '../config/db.js';

const router = express.Router();

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { name, email, mobile, company, department } = req.body;

    // Get Razorpay credentials
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error('Razorpay credentials not configured');
      return res.status(500).json({ error: 'Payment system not configured' });
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

    const authString = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const response = await fetch('https://api.razorpay.com/v1/orders', {
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
    console.log('✅ Razorpay order created:', order.id);

    res.status(200).json({
      order_id: order.id,
      amount: totalAmount,
      currency: 'INR',
      key_id: keyId,
    });

  } catch (error) {
    console.error('❌ Error creating order:', error);
    res.status(500).json({ 
      error: 'Failed to create payment order. Please try again.' 
    });
  }
});

// Razorpay webhook handler
router.post('/webhook', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const body = JSON.stringify(req.body);
    
    // Verify Razorpay signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('RAZORPAY_WEBHOOK_SECRET not configured');
      return res.status(500).json({ error: 'Configuration error' });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.warn('⚠️ Invalid webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const event = req.body;
    console.log('📥 Razorpay webhook event:', event.event);

    // Handle payment success
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const { id: payment_id, order_id, amount, email, contact } = payment;

      console.log('💰 Payment captured:', { payment_id, order_id, email });

      // Get order details from notes
      const notes = payment.notes || {};

      // Connect to MongoDB and save registration
      const db = await getDatabase();
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
        updatedAt: new Date(),
      };

      await registrations.insertOne(registration);
      console.log('✅ Registration saved after payment:', { email, payment_id });
    }

    res.status(200).json({ received: true });

  } catch (error) {
    console.error('❌ Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;

