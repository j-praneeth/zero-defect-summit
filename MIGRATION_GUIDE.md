# Migration from Supabase to MongoDB

This document outlines the migration from Supabase to MongoDB that was completed for the Zero Defect Summit project.

## What Changed?

### 1. Database Migration
- **Before**: Supabase (PostgreSQL with built-in features)
- **After**: MongoDB Atlas (NoSQL database)

### 2. Backend Architecture
- **Before**: Supabase Edge Functions (Deno-based serverless functions)
- **After**: Express.js REST API (Node.js server)

### 3. Frontend API Client
- **Before**: `@supabase/supabase-js` client library
- **After**: Custom API client using native `fetch`

## Changes Made

### Backend (New)

Created a new Express.js backend in the `/backend` directory:

```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── rateLimit.js       # Rate limiting middleware
│   ├── routes/
│   │   ├── registration.js    # Registration endpoints
│   │   └── razorpay.js        # Payment endpoints
│   └── server.js              # Main server
├── package.json
├── .env.example
└── README.md
```

### Frontend Changes

1. **Removed Dependencies**:
   - `@supabase/supabase-js` ❌

2. **Removed Files**:
   - `src/integrations/supabase/client.ts` ❌
   - `src/integrations/supabase/types.ts` ❌
   - `src/integrations/supabase/` directory ❌

3. **New Files**:
   - `src/lib/api.ts` ✅ - API client for backend communication

4. **Modified Files**:
   - `src/components/RegistrationForm.tsx` - Now uses `saveRegistration()` from `api.ts`
   - `src/pages/InvoicePage.tsx` - Removed unused Supabase import
   - `package.json` - Removed Supabase dependency

## API Endpoint Mapping

### Old (Supabase Edge Functions)
```typescript
// Save registration
supabase.functions.invoke('save-registration', { body: data })

// Create Razorpay order
supabase.functions.invoke('create-razorpay-order', { body: data })
```

### New (Express.js API)
```typescript
// Save registration
POST http://localhost:3001/api/registration/save-registration

// Create Razorpay order
POST http://localhost:3001/api/razorpay/create-order

// Webhook handler
POST http://localhost:3001/api/razorpay/webhook
```

## Data Schema Comparison

### Supabase (PostgreSQL)
```sql
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  department TEXT,
  company TEXT NOT NULL,
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  payment_status TEXT,
  amount NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### MongoDB
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  mobile: String,
  department: String,
  company: String,
  razorpay_payment_id: String,
  razorpay_order_id: String,
  payment_status: String,
  amount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

### Before (Supabase)
```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=xxx
```

### After (MongoDB)
```env
# Frontend
VITE_API_URL=http://localhost:3001

# Backend
MONGODB_URI=mongodb+srv://xxx
RAZORPAY_KEY_ID=xxx
RAZORPAY_KEY_SECRET=xxx
RAZORPAY_WEBHOOK_SECRET=xxx
```

## Setup Steps After Migration

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB and Razorpay credentials
```

### 3. Start Backend Server
```bash
cd backend
npm run dev
```

### 4. Update Frontend Environment (if needed)
```bash
# In project root, create .env if it doesn't exist
echo "VITE_API_URL=http://localhost:3001" > .env
```

### 5. Reinstall Frontend Dependencies
```bash
# In project root
npm install
```

### 6. Start Frontend
```bash
npm run dev
```

## Benefits of MongoDB Migration

1. **Flexibility**: Schema-less design allows for easier changes
2. **Scalability**: MongoDB Atlas provides excellent scaling options
3. **Control**: Full control over backend API and business logic
4. **Cost**: Potentially lower costs compared to Supabase for high-volume usage
5. **Performance**: Optimized for document-based queries
6. **Portability**: Can be deployed anywhere (not tied to Supabase infrastructure)

## Testing the Migration

1. **Health Check**:
   ```bash
   curl http://localhost:3001/health
   ```

2. **Test Registration**:
   - Open frontend at `http://localhost:5173`
   - Fill out the registration form
   - Submit and verify data is saved in MongoDB

3. **Check MongoDB**:
   - Connect to your MongoDB Atlas cluster
   - Verify registrations are being saved in the `pharma` database
   - Check the `registrations` collection

## Rollback Plan (if needed)

If you need to rollback to Supabase:

1. Restore Supabase files from git history
2. Reinstall `@supabase/supabase-js`
3. Restore Supabase environment variables
4. Stop MongoDB backend

```bash
git checkout <previous-commit> -- src/integrations/supabase
npm install @supabase/supabase-js
```

## Troubleshooting

### Backend won't start
- Check MongoDB URI is correct
- Verify all environment variables are set
- Ensure MongoDB allows connection from your IP

### Frontend can't connect to backend
- Verify backend is running on port 3001
- Check `VITE_API_URL` is set correctly
- Ensure CORS is configured properly

### Database connection errors
- Check MongoDB Atlas network access
- Verify database user credentials
- Ensure database name is 'pharma'

## Support

For questions about the migration, contact the development team or refer to:
- Backend README: `/backend/README.md`
- Main README: `/README.md`

