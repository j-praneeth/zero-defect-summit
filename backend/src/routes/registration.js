import express from 'express';
import { body, validationResult } from 'express-validator';
import { getDatabase } from '../config/db.js';
import { rateLimit } from '../middleware/rateLimit.js';

const router = express.Router();

// Validation rules
const registrationValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .isLength({ max: 255 })
    .withMessage('Email must be less than 255 characters')
    .normalizeEmail(),
  body('mobile')
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Mobile number must be 10 digits starting with 6-9'),
  body('company')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Company name must be between 2 and 200 characters'),
  body('department')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Department name must be less than 100 characters'),
];

// Save registration
router.post('/save-registration', rateLimit, registrationValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: errors.array()[0].msg 
      });
    }

    const { name, email, mobile, department, company, razorpay_payment_id, razorpay_order_id, payment_status } = req.body;

    // Get database connection
    const db = await getDatabase();
    const registrations = db.collection('registrations');

    // Check for duplicate registration (same email within last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingReg = await registrations.findOne({
      email: email.toLowerCase(),
      createdAt: { $gte: oneDayAgo }
    });

    if (existingReg) {
      console.warn(`Duplicate registration attempt for email: ${email}`);
      return res.status(409).json({ 
        error: 'A registration with this email already exists. Please contact support if you need assistance.' 
      });
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
      updatedAt: new Date(),
    };

    const result = await registrations.insertOne(registration);
    
    console.log('✅ Registration saved successfully', { 
      id: result.insertedId.toString(),
      email: email.toLowerCase(),
      payment_status: payment_status || 'pending'
    });

    res.status(200).json({ 
      success: true, 
      message: 'Registration saved successfully',
      id: result.insertedId.toString()
    });

  } catch (error) {
    console.error('❌ Error saving registration:', error);
    res.status(500).json({ 
      error: 'Registration failed. Please try again or contact support if the problem persists.' 
    });
  }
});

export default router;

