# Lovable Setup - Automatic Backend + Frontend

## ✅ Configuration Complete!

Your project is now configured to automatically run both frontend and backend when you push to Lovable.

## What Changed

### 1. Updated `dev` Script
The `dev` script now runs both frontend and backend automatically:

```json
"dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\""
```

**What this means:**
- When Lovable runs `npm run dev`, it will start BOTH servers
- Frontend on: `http://localhost:8080` (or port 5173 if 8080 is taken)
- Backend on: `http://localhost:3001`

### 2. Added `postinstall` Script
Automatically installs backend dependencies when you run `npm install`:

```json
"postinstall": "cd backend && (npm install || echo 'Backend dependencies install completed or skipped')"
```

**What this means:**
- When you or Lovable runs `npm install` in the root, it will also install backend dependencies
- No need to manually `cd backend && npm install`

### 3. Script Breakdown

| Script | What It Does |
|--------|--------------|
| `npm run dev` | **Runs both frontend + backend** (Lovable will use this) |
| `npm run dev:frontend` | Runs only frontend (Vite) |
| `npm run dev:backend` | Runs only backend (Express) |
| `npm run dev:all` | Same as `dev` (runs both) |

## How It Works in Lovable

1. **When you push to Lovable:**
   - Lovable runs `npm install` in the root
   - The `postinstall` script automatically installs backend dependencies
   - Lovable runs `npm run dev`
   - Both frontend and backend start automatically! 🎉

2. **What you'll see:**
   ```
   [0] Frontend server running on http://localhost:8080
   [1] Backend server running on http://localhost:3001
   ```

## Environment Variables Setup

### For Lovable (Production-like)

You'll need to set these environment variables in Lovable:

**Backend Environment Variables:**
```
PORT=3001
MONGODB_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
FRONTEND_URL=https://your-lovable-app-url.lovable.app
NODE_ENV=production
```

**Frontend Environment Variables:**
```
VITE_API_URL=https://your-backend-url.com
```

### For Local Development

Create these files:

**Root `.env`:**
```env
VITE_API_URL=http://localhost:3001
```

**`backend/.env`:**
```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
FRONTEND_URL=http://localhost:8080
```

## Testing Locally

After pushing, test locally:

```bash
# Install all dependencies (frontend + backend)
npm install

# Start both servers
npm run dev
```

You should see:
- ✅ Frontend running on http://localhost:8080
- ✅ Backend running on http://localhost:3001
- ✅ Both running concurrently

## Troubleshooting

### Backend doesn't start in Lovable

**Check:**
1. Are environment variables set in Lovable?
2. Is MongoDB URI correct?
3. Check Lovable logs for errors

### Frontend can't connect to backend

**Check:**
1. Is `VITE_API_URL` set correctly?
2. Is backend actually running? (check logs)
3. Are CORS settings correct? (should allow Lovable domain)

### Port conflicts

If you see port conflicts:
- Frontend: Check `vite.config.ts` (currently set to 8080)
- Backend: Check `backend/.env` PORT variable (default 3001)

## What Lovable Will Do

1. ✅ Clone your repository
2. ✅ Run `npm install` (installs frontend + backend deps via postinstall)
3. ✅ Run `npm run dev` (starts both servers)
4. ✅ Serve frontend on Lovable's domain
5. ✅ Backend runs in the background

## Important Notes

1. **Backend needs to be accessible:**
   - If Lovable doesn't support backend servers, you may need to deploy backend separately (Railway, Heroku, etc.)
   - Then set `VITE_API_URL` to your deployed backend URL

2. **Environment Variables:**
   - Set all backend env vars in Lovable's environment settings
   - Set frontend `VITE_API_URL` in Lovable's environment settings

3. **MongoDB Connection:**
   - Make sure MongoDB Atlas allows connections from Lovable's IP
   - Or allow all IPs (0.0.0.0/0) for development

## Next Steps

1. ✅ Push your code to Lovable
2. ✅ Set environment variables in Lovable dashboard
3. ✅ Lovable will automatically run `npm run dev`
4. ✅ Both servers will start!
5. ✅ Test your registration form

---

**Ready to push!** 🚀

When you push to Lovable, it will automatically:
- Install all dependencies (frontend + backend)
- Start both servers
- Make your app available!

