# Zero Defect Summit - Event Registration Platform

A comprehensive event registration and payment system built with React, TypeScript, Express, and MongoDB.

## Project Overview

This project is a full-stack event registration platform for the Zero Defect Summit workshop. It features:

- Modern, responsive frontend built with React and Vite
- RESTful API backend with Express.js
- MongoDB database for data persistence
- Razorpay payment integration
- Registration form with validation
- Invoice generation
- Rate limiting and security features

## Technologies Used

### Frontend
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn/ui** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Zod** - Schema validation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **express-validator** - Request validation
- **CORS** - Cross-origin resource sharing

## Project Structure

```
zero-defect-summit/
├── backend/              # Express.js backend API
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── middleware/  # Rate limiting, etc.
│   │   ├── routes/      # API routes
│   │   └── server.js    # Main server file
│   ├── package.json
│   └── .env.example
├── src/                  # Frontend React application
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── lib/            # API client and utilities
│   └── assets/         # Images and static files
├── public/
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Razorpay account

### 1. Clone the Repository
```bash
git clone <YOUR_GIT_URL>
cd zero-defect-summit
```

### 2. Setup Backend

```bash
cd backend
npm install

# Copy environment file
cp .env.example .env
```

Edit `backend/.env` and add your configuration:
```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
FRONTEND_URL=http://localhost:5173
```

Start the backend server:
```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

The backend API will be available at `http://localhost:3001`

### 3. Setup Frontend

Open a new terminal and navigate to the project root:

```bash
# Install dependencies
npm install

# Create .env file (if needed)
# Add: VITE_API_URL=http://localhost:3001
```

Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Health Check
- `GET /health` - Check server status

### Registration
- `POST /api/registration/save-registration` - Save registration data

### Razorpay
- `POST /api/razorpay/create-order` - Create payment order
- `POST /api/razorpay/webhook` - Handle payment webhooks

## MongoDB Schema

### Registrations Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (indexed, lowercase),
  mobile: String,
  department: String (optional),
  company: String,
  razorpay_payment_id: String (optional),
  razorpay_order_id: String (optional),
  payment_status: String (enum: 'pending', 'completed'),
  amount: Number (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Frontend Deployment
You can deploy the frontend using:
- Vercel
- Netlify
- GitHub Pages
- [Lovable](https://lovable.dev)

Build the frontend:
```bash
npm run build
```

### Backend Deployment
You can deploy the backend using:
- Heroku
- Railway
- DigitalOcean
- AWS EC2

Make sure to:
1. Set all environment variables
2. Configure MongoDB connection string
3. Set up Razorpay webhook URL

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-api.com
```

### Backend (.env)
```env
PORT=3001
MONGODB_URI=mongodb+srv://...
RAZORPAY_KEY_ID=rzp_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...
FRONTEND_URL=https://your-frontend.com
```

## Features

- ✅ User registration with validation
- ✅ MongoDB database integration
- ✅ Razorpay payment gateway
- ✅ Invoice generation
- ✅ Rate limiting (5 requests per hour per IP)
- ✅ Duplicate registration prevention
- ✅ Mobile number formatting
- ✅ Email normalization
- ✅ Responsive design
- ✅ Error handling
- ✅ CORS configuration

## Security Features

- Rate limiting to prevent abuse
- Input validation and sanitization
- Duplicate registration detection
- Secure environment variable handling
- CORS protection
- Webhook signature verification

## Support

For any issues or questions, please contact:
- Email: hello@axygenpharmatech.com
- Phone: +91 9603978651

## License

Private - All rights reserved
