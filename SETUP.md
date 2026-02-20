# KodBanking Setup Guide

Complete step-by-step setup instructions for KodBanking.

## Prerequisites

- Node.js 16+ and npm
- MySQL 8.0+ (or use Aiven Cloud MySQL)
- Git

## Step 1: Database Setup (MySQL/Aiven)

### Option A: Local MySQL
```bash
mysql -u root -p
```

Run the schema from `backend/database.sql`:
```sql
-- Copy entire content from backend/database.sql and paste
```

### Option B: Aiven Cloud MySQL
1. Sign up at https://aiven.io
2. Create MySQL service
3. Get connection details (host, port, user, password)

## Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.template)
cp .env.template .env

# Edit .env with your database details
# DB_HOST=your-host
# DB_USER=your-user
# DB_PASSWORD=your-password
# JWT_SECRET=your-secret-key

# Test the connection
npm run dev
```

The backend will start on `http://localhost:5000`

### Backend .env Configuration

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost          # or your Aiven host
DB_PORT=3306              # or Aiven port
DB_USER=root              # your MySQL user
DB_PASSWORD=password      # your MySQL password
DB_NAME=kodbanking
DB_SSL=false              # true for Aiven
JWT_SECRET=your-secret-key-here-change-in-production
JWT_EXPIRES_IN=24h
```

## Step 3: Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.template .env

# Edit .env
VITE_API_URL=http://localhost:5000

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### Frontend .env Configuration

```env
VITE_API_URL=http://localhost:5000
```

## Step 4: Verify Setup

### Test Backend API

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "UID001",
    "uname": "testuser",
    "password": "password123",
    "email": "test@example.com",
    "phone": "9876543210"
  }'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "uname": "testuser",
    "password": "password123"
  }'
```

### Test Frontend

```bash
# Terminal 3: Start frontend
cd frontend
npm run dev

# Open in browser
http://localhost:5173
```

## Database Schema

### users table
```
- id (PRIMARY KEY, AUTO INCREMENT)
- uid (VARCHAR, UNIQUE)
- uname (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)
- email (VARCHAR, UNIQUE)
- phone (VARCHAR)
- role (VARCHAR, default: 'customer')
- balance (DECIMAL, default: 100000)
- created_at (TIMESTAMP)
```

### user_tokens table
```
- id (PRIMARY KEY, AUTO INCREMENT)
- uname (VARCHAR, FOREIGN KEY)
- token (LONGTEXT)
- created_at (TIMESTAMP)
```

## Authentication Flow

1. User registers with uid, uname, password, email, phone
2. Password is hashed with bcrypt (10 rounds)
3. User logs in with uname and password
4. Backend verifies credentials and generates JWT token
5. Token is stored in database
6. Token sent as HttpOnly cookie
7. Frontend sends cookie with every protected request
8. Backend verifies token and extracts username
9. Balance is fetched and returned to user

## Deployment Guide

### Deploy Backend (Heroku/Railway/Render)

1. Create account on Heroku / Railway / Render
2. Connect GitHub repository
3. Set environment variables in dashboard
4. Deploy

### Deploy Frontend (Vercel/Netlify)

1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set `VITE_API_URL` to production backend URL
4. Deploy

## Troubleshooting

### Database Connection Error
- Check database credentials in .env
- Verify database exists (run database.sql)
- Check if port is correct (3306 for local, 21029 for Aiven)

### JWT Token Error
- Clear localStorage in browser
- Login again
- Check JWT_SECRET matches in backend

### CORS Error
- Ensure frontend URL is in CORS origin on backend
- Check credentials: true in axios config

### Port Already in Use
```bash
# Check port 5000 (backend)
netstat -ano | findstr :5000

# Check port 5173 (frontend)
netstat -ano | findstr :5173

# Kill process (Windows)
taskkill /PID <PID> /F
```

## Production Checklist

- [ ] Change JWT_SECRET to strong key
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Use environment variables for all secrets
- [ ] Set secure: true for cookies in production
- [ ] Configure CORS for production domain
- [ ] Use connection pooling for database
- [ ] Add rate limiting
- [ ] Enable logging and monitoring
- [ ] Use HTTPS for Aiven connection
- [ ] Set secure password in production
- [ ] Enable backup for MySQL database

## Aiven MySQL Connection (Production)

```env
DB_HOST=<your-service-id>.aivencloud.com
DB_PORT=21029
DB_USER=avnadmin
DB_PASSWORD=<your-password>
DB_NAME=kodbanking
DB_SSL=true
```

## Performance Optimization

1. Use database connection pooling (already configured)
2. Add caching for balance queries
3. Implement rate limiting on auth endpoints
4. Use CDN for frontend assets (Vercel/Netlify)
5. Add compression middleware
6. Implement lazy loading in React

## Support

Check logs in terminal for debugging:
- Backend logs appear in `npm run dev` terminal
- Frontend logs appear in browser console
- MySQL errors in backend console

Happy Banking! 🏦
