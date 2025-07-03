# Vercel Deployment Fix Guide

## Issues Fixed

1. **Cars Not Showing**: Fixed hardcoded `localhost:5000` URLs in components
2. **Booking Not Working**: Updated API endpoints to use environment variables
3. **CORS Issues**: Improved backend CORS configuration for Vercel domains

## Steps to Deploy

### 1. Backend Deployment

Deploy your backend to one of these platforms:

#### Option A: Railway (Recommended)
1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select the `backend` folder
4. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret
   - `PORT`: Will be set automatically

#### Option B: Render
1. Go to [Render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables as above

### 2. Frontend Deployment (Vercel)

1. Deploy your frontend to Vercel
2. In Vercel dashboard, go to your project settings
3. Add environment variable:
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** Your deployed backend URL (e.g., `https://your-app.railway.app`)

### 3. Test Your Deployment

1. Check if cars are loading on your Vercel site
2. Try to register/login
3. Test the booking functionality

## Common Issues & Solutions

### Cars Still Not Showing
- Check browser console for errors
- Verify `VITE_API_BASE_URL` is set correctly in Vercel
- Ensure backend is accessible from browser

### Booking Not Working
- Check if user authentication is working
- Verify all API endpoints are responding
- Check browser console for CORS errors

### CORS Errors
- The backend CORS is now configured to allow Vercel domains
- If you have a custom domain, uncomment and update the CORS configuration

## Environment Variables Summary

### Frontend (Vercel)
```
VITE_API_BASE_URL=https://your-backend-url.com
```

### Backend (Railway/Render/etc.)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car_rental
JWT_SECRET=your_secret_key_here
PORT=5000
```

## Testing Checklist

- [ ] Cars load on the homepage
- [ ] Cars load on the /cars page
- [ ] User registration works
- [ ] User login works
- [ ] Booking form loads
- [ ] Booking submission works
- [ ] No CORS errors in browser console
- [ ] All API endpoints respond correctly 