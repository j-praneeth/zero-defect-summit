# CORS Error Fix - Explanation

## The Problem

You were getting this error:
```
Access to fetch at 'http://localhost:3001/api/registration/save-registration' 
from origin 'http://localhost:8080' has been blocked by CORS policy: 
The 'Access-Control-Allow-Origin' header has a value 'http://localhost:5173' 
that is not equal to the supplied origin.
```

## Root Cause

- **Frontend running on:** `http://localhost:8080`
- **Backend CORS configured for:** `http://localhost:5173` only
- **Result:** Browser blocks the request because origins don't match

## The Fix

I've updated `backend/src/server.js` to:

1. **In Development:** Allow ALL localhost origins (any port)
   - `http://localhost:8080` ✅
   - `http://localhost:5173` ✅
   - `http://localhost:3000` ✅
   - Any other localhost port ✅

2. **In Production:** Use the `FRONTEND_URL` environment variable
   - Can specify single URL: `FRONTEND_URL=https://yourdomain.com`
   - Can specify multiple URLs: `FRONTEND_URL=https://domain1.com,https://domain2.com`

## How It Works Now

```javascript
// Development mode (NODE_ENV !== 'production')
✅ Allows: http://localhost:*
✅ Allows: http://127.0.0.1:*

// Production mode
✅ Uses: FRONTEND_URL environment variable
✅ Supports multiple origins (comma-separated)
```

## What You Need to Do

### 1. Restart Your Backend Server

The CORS configuration change requires a server restart:

```bash
# Stop the current backend (Ctrl+C)
# Then restart it:
cd backend
npm run dev
```

### 2. Test the Fix

After restarting, try your registration form again. It should work now!

### 3. For Production (Later)

When deploying to production, set:

```env
NODE_ENV=production
FRONTEND_URL=https://your-actual-domain.com
```

Or for multiple domains:

```env
NODE_ENV=production
FRONTEND_URL=https://domain1.com,https://domain2.com
```

## Why This Happened

The original CORS configuration was hardcoded to only allow `http://localhost:5173` (the default Vite port). But your frontend was running on port `8080`, which could happen if:

- Port 5173 was already in use
- You're using a different dev server
- You manually changed the port
- You're using a different build tool

## Additional CORS Headers Configured

The fix also includes:
- ✅ `credentials: true` - Allows cookies/auth headers
- ✅ Methods: GET, POST, PUT, DELETE, OPTIONS
- ✅ Headers: Content-Type, Authorization, x-razorpay-signature

## Testing

After restarting the backend, you can test with:

```bash
# Test from command line (should work)
curl -X POST http://localhost:3001/api/registration/save-registration \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:8080" \
  -d '{"name":"Test","email":"test@test.com","mobile":"9876543210","company":"Test Co"}'
```

Or just try submitting the form in your browser - it should work now! 🎉

