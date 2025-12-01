# Deployment Guide

## Backend Deployment

### Option 1: Deploy to Railway/Render/Heroku

1. **Create account** on Railway, Render, or Heroku
2. **Connect your repository**
3. **Set environment variables:**
   - `PORT` (auto-set by platform)
   - `MONGODB_URI` (MongoDB Atlas connection string)
   - `JWT_SECRET` (generate a strong random string)
   - `NODE_ENV=production`

4. **Build settings:**
   - Root directory: `server`
   - Build command: `npm install`
   - Start command: `npm start`

### Option 2: Deploy to Vercel (Serverless Functions)

1. Create `vercel.json` in server folder:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

2. Deploy using Vercel CLI or dashboard

### MongoDB Setup

1. **MongoDB Atlas (Recommended):**
   - Create account at mongodb.com/cloud/atlas
   - Create a free cluster
   - Get connection string
   - Add your IP to whitelist
   - Update `MONGODB_URI` in environment variables

2. **Local MongoDB:**
   - Install MongoDB locally
   - Use: `mongodb://localhost:27017/techlearn`

## Frontend Deployment

### Deploy to Vercel

1. **Connect repository** to Vercel
2. **Build settings:**
   - Root directory: `client`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

3. **Environment variables:**
   - `VITE_API_URL` = Your backend API URL (e.g., `https://your-backend.railway.app/api`)

4. **Deploy!**

## Quick Start (Local Development)

### Backend:
```bash
cd server
npm install
# Create .env file with MONGODB_URI
npm run dev
```

### Frontend:
```bash
cd client
npm install
# Create .env file with VITE_API_URL=http://localhost:5000/api
npm run dev
```

## Environment Variables

### Backend (.env):
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techlearn
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
```

### Frontend (.env):
```
VITE_API_URL=http://localhost:5000/api
```

## Testing the Deployment

1. **Backend Health Check:**
   - Visit: `https://your-backend-url/api/health`
   - Should return: `{ status: 'OK', message: 'TechLearn API is running' }`

2. **Frontend:**
   - Visit your Vercel URL
   - Test registration and login flows
   - Verify API calls work

## Troubleshooting

- **CORS errors:** Make sure backend CORS is configured
- **404 errors:** Check Vercel routing configuration
- **API connection:** Verify `VITE_API_URL` is set correctly
- **MongoDB connection:** Check connection string and IP whitelist
