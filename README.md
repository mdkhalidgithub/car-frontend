# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Car Rental App

## Project Structure

- **Frontend:** React (in `src/`)
- **Backend:** Node.js/Express/MongoDB (in `backend/`)

---

## 1. Backend Setup

1. Create a `.env` file in `backend/`:
   ```
   MONGODB_URI=mongodb://localhost:27017/car_rental
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```
2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```
3. Start the backend server:
   ```
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

---

## 2. Frontend Setup

1. Install frontend dependencies (from project root):
   ```
   npm install
   ```
2. Create a `.env` file in the root directory for API URL:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```
3. Start the frontend:
   ```
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (default Vite port).

---

## 3. Vercel Deployment Setup

### Frontend Deployment (Vercel)
1. Deploy your frontend to Vercel
2. In Vercel dashboard, go to your project settings
3. Add environment variable:
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** Your deployed backend URL (e.g., `https://your-backend-domain.com`)

### Backend Deployment
Deploy your backend to a platform like:
- **Railway**
- **Render**
- **Heroku**
- **DigitalOcean App Platform**

Make sure to set the following environment variables on your backend:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Your JWT secret
- `PORT` - Port number (usually set automatically by the platform)

---

## 4. API Endpoints Overview

- **Auth:**
  - `POST /api/auth/register` — Register a new user
  - `POST /api/auth/login` — Login and receive JWT
- **Cars:**
  - `GET /api/cars` — List all cars
  - `GET /api/cars/:id` — Get car by ID
  - `POST /api/cars` — Add car (admin only)
  - `PUT /api/cars/:id` — Update car (admin only)
  - `DELETE /api/cars/:id` — Delete car (admin only)
- **Bookings:**
  - `GET /api/bookings/user/:userId` — Get bookings for a user
  - `POST /api/bookings` — Create a booking
  - `PUT /api/bookings/:id/cancel` — Cancel a booking

---

## 5. Example: Using the API in React

```js
// Example: Fetch cars
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

fetch(`${API_BASE_URL}/api/cars`)
  .then(res => res.json())
  .then(data => console.log(data));

// Example: Register
fetch(`${API_BASE_URL}/api/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, password })
});

// Example: Login
fetch(`${API_BASE_URL}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

---

## 6. Troubleshooting Vercel Deployment

### Cars Not Showing
- Check if `VITE_API_BASE_URL` is set correctly in Vercel environment variables
- Ensure your backend is deployed and accessible
- Check browser console for CORS errors

### Booking Not Working
- Verify the backend API endpoints are working
- Check if user authentication is working properly
- Ensure all required environment variables are set

### Common Issues
1. **CORS Errors:** Make sure your backend allows requests from your Vercel domain
2. **Environment Variables:** Double-check all environment variables are set in Vercel
3. **Backend URL:** Ensure your backend URL is correct and accessible

---

## 7. Notes
- Make sure MongoDB is running locally or update the `MONGODB_URI` in your `.env`.
- Use the JWT token from login for protected routes (send as `Authorization: Bearer <token>` header).
- For production, always use HTTPS URLs for your API endpoints.
