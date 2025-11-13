# Quick Setup Guide

Follow these steps to get the Zero Defect Summit application running locally.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas account** - [Sign up here](https://www.mongodb.com/cloud/atlas/register)
- **Razorpay account** - [Sign up here](https://razorpay.com/)

## Step 1: Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd zero-defect-summit
```

## Step 2: Setup MongoDB

1. **Create a MongoDB Atlas Cluster**:
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a new cluster (free tier is fine for development)
   - Create a database named `pharma`

2. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

3. **Configure Network Access**:
   - Go to Network Access in MongoDB Atlas
   - Add your IP address or allow access from anywhere (0.0.0.0/0) for development

## Step 3: Setup Razorpay

1. **Get API Keys**:
   - Log in to [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Go to Settings → API Keys
   - Generate Test/Live keys
   - Copy the Key ID and Key Secret

2. **Setup Webhook**:
   - Go to Settings → Webhooks
   - Add webhook URL: `http://your-backend-url/api/razorpay/webhook`
   - Copy the webhook secret

## Step 4: Install Backend Dependencies

```bash
cd backend
npm install
```

## Step 5: Configure Backend Environment

```bash
# Create .env file
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pharma?retryWrites=true&w=majority
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
```

## Step 6: Install Frontend Dependencies

```bash
# Go back to project root
cd ..
npm install
```

## Step 7: Configure Frontend Environment (Optional)

If your backend is running on a different port or domain:

```bash
# Create .env file in project root
echo "VITE_API_URL=http://localhost:3001" > .env
```

Default is `http://localhost:3001`, so this step is optional if using default settings.

## Step 8: Start the Application

You have two options:

### Option A: Run Everything at Once (Recommended)

```bash
# From project root
npm run dev:all
```

This will start both frontend and backend servers simultaneously.

### Option B: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
# In project root
npm run dev
```

## Step 9: Verify Installation

1. **Check Backend Health**:
   ```bash
   curl http://localhost:3001/health
   ```
   
   Expected response: `{"status":"OK","message":"Server is running"}`

2. **Check Frontend**:
   - Open browser: `http://localhost:5173`
   - You should see the Zero Defect Summit homepage

3. **Test Registration**:
   - Navigate to Registration page
   - Fill out the form
   - Submit registration
   - Check MongoDB Atlas to verify data was saved

## Troubleshooting

### Backend Won't Start

**Problem**: "MONGODB_URI is not defined"
- **Solution**: Make sure `.env` file exists in `backend/` directory with all required variables

**Problem**: "MongoDB connection error"
- **Solution**: 
  - Check your MongoDB connection string is correct
  - Verify network access is configured in MongoDB Atlas
  - Ensure database name is `pharma`

### Frontend Can't Connect to Backend

**Problem**: Network error when submitting form
- **Solution**:
  - Verify backend is running on port 3001
  - Check browser console for CORS errors
  - Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL

### Port Already in Use

**Problem**: "Port 3001 is already in use"
- **Solution**: 
  - Kill the process using that port, or
  - Change `PORT` in `backend/.env` to a different port
  - Update `VITE_API_URL` in frontend if needed

### Dependencies Installation Failed

**Problem**: npm install errors
- **Solution**:
  - Delete `node_modules` and `package-lock.json`
  - Run `npm install` again
  - Try `npm cache clean --force` if issues persist

## Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload. Changes will be reflected automatically.

2. **MongoDB GUI**: Use [MongoDB Compass](https://www.mongodb.com/products/compass) to view your database visually.

3. **API Testing**: Use [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/) to test API endpoints.

4. **Logs**: 
   - Backend logs appear in the terminal running `npm run dev` (backend)
   - Frontend logs appear in browser console

## Production Deployment

For production deployment instructions, see the main [README.md](README.md) file.

## Need Help?

- Check [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) for detailed architecture information
- See [backend/README.md](backend/README.md) for backend-specific documentation
- Contact: hello@axygenpharmatech.com

## Next Steps

Once everything is running:

1. Test the registration flow
2. Configure Razorpay payment link
3. Customize branding and content
4. Set up production environment
5. Deploy to production servers

Happy coding! 🚀

