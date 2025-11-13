# Zero Defect Summit - Backend API

This is the backend API server for the Zero Defect Summit registration system, built with Express.js and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB URI and Razorpay credentials.

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

### Health Check
- **GET** `/health` - Check if server is running

### Registration
- **POST** `/api/registration/save-registration` - Save a new registration

### Razorpay
- **POST** `/api/razorpay/create-order` - Create a Razorpay order
- **POST** `/api/razorpay/webhook` - Handle Razorpay payment webhooks

## Environment Variables

- `PORT` - Server port (default: 3001)
- `MONGODB_URI` - MongoDB connection string
- `RAZORPAY_KEY_ID` - Razorpay API key ID
- `RAZORPAY_KEY_SECRET` - Razorpay API key secret
- `RAZORPAY_WEBHOOK_SECRET` - Razorpay webhook secret
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)

