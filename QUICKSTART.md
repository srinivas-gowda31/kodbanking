# 🚀 KodBanking - Quick Start Guide

## ✅ Project Structure Created

Your KodBanking project is fully configured with:

```
kodbanking/
├── backend/                          # Express.js API server
│   ├── config/database.js            # MySQL connection pool
│   ├── models/                       # Data models
│   │   ├── User.js
│   │   └── UserToken.js
│   ├── controllers/                  # Business logic
│   │   ├── authController.js
│   │   └── accountController.js
│   ├── routes/                       # API routes
│   │   ├── authRoutes.js
│   │   └── accountRoutes.js
│   ├── middlewares/
│   │   └── authMiddleware.js         # JWT verification
│   ├── .env                          # Environment variables (configured)
│   ├── database.sql                  # MySQL schema
│   ├── server.js                     # Express entry point
│   ├── package.json
│   └── node_modules/                 # ✅ Installed
│
├── frontend/                         # React + Vite app
│   ├── src/
│   │   ├── pages/                    # Page components
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx    # Route protection
│   │   ├── services/
│   │   │   └── api.js                # Axios API client
│   │   ├── App.jsx                   # Main app with routing
│   │   ├── main.jsx                  # React entry
│   │   └── index.css                 # Tailwind styles
│   ├── .env                          # Environment variables (configured)
│   ├── tailwind.config.js            # Tailwind CSS config
│   ├── postcss.config.js
│   ├── vite.config.js
│   ├── index.html
│   ├── package.json
│   └── node_modules/                 # ✅ Installed
│
├── README.md                         # Project overview
├── SETUP.md                          # Detailed setup guide
└── API.md                            # API documentation
```

---

## 🎯 Current Status

✅ All files created
✅ Backend dependencies installed (124 packages)
✅ Frontend dependencies installed
✅ Environment files configured
✅ Database schema ready

---

## 📋 Database Setup

Before running the application, set up your MySQL database.

### Option 1: Local MySQL

```bash
# Open MySQL client
mysql -u root -p

# Run the schema script
source backend/database.sql

# Or copy-paste the entire content of backend/database.sql
```

### Option 2: Aiven Cloud MySQL

1. Sign up at https://aiven.io
2. Create MySQL service
3. Get connection details
4. Update `.env` files:
   ```
   DB_HOST=xxx.aivencloud.com
   DB_PORT=21029
   DB_USER=avnadmin
   DB_PASSWORD=xxxxx
   DB_SSL=true
   ```
5. Execute the SQL schema through Aiven console

---

## 🚀 Running the Application

Open **TWO separate terminals** and run:

### Terminal 1: Start Backend Server

```bash
cd c:\Users\srini\OneDrive\Desktop\kodbanking\backend
npm run dev
```

Expected output:
```
Server running on http://localhost:5000
```

### Terminal 2: Start Frontend Application

```bash
cd c:\Users\srini\OneDrive\Desktop\kodbanking\frontend
npm run dev
```

Expected output:
```
VITE v5.0.2 ready in xxx ms
Local:   http://localhost:5173/
```

---

## 🌐 Access the Application

Open your browser and go to:
```
http://localhost:5173
```

---

## 🧪 Test the Workflow

### 1. Register a New User
- Go to Register page
- Fill in details:
  - UID: `UID001`
  - Username: `testuser`
  - Password: `Test@123`
  - Email: `test@example.com`
  - Phone: `9876543210`
- Click "Register"
- ✅ You'll be redirected to login

### 2. Login
- Enter username: `testuser`
- Enter password: `Test@123`
- Click "Login"
- ✅ You'll be redirected to dashboard

### 3. Check Balance
- On dashboard, click "💰 Check Balance"
- ✅ You'll see your balance: **₹100,000**
- See animated success message with confetti

### 4. Logout
- Click "Logout" button
- ✅ You'll be redirected to login

---

## 🔐 Authentication Flow

1. **Register** → Password hashed with bcrypt → Stored in DB
2. **Login** → Credentials verified → JWT generated → Token stored in DB
3. **Protected Route** → Token verified → User identified → Data returned
4. **Logout** → Token removed from DB → Cookie cleared

---

## 📊 API Endpoints

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/account/balance` | Get balance | Yes |

---

## 🛠️ Configuration

### Backend `.env`
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=kodbanking
DB_SSL=false
JWT_SECRET=kodbanking_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=24h
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000
```

---

## 📦 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Database** | MySQL | 8.0+ |
| **Backend** | Node.js + Express | 18.x |
| **Frontend** | React + Vite | 18.x + 5.x |
| **Styling** | Tailwind CSS | 3.3+ |
| **Auth** | JWT + HttpOnly Cookie | HS256 |
| **Hashing** | Bcrypt | 2.4+ |

---

## 🔒 Security Features

✅ **Password Security**
- Hashed with bcrypt (10 salt rounds)
- Never stored in plain text

✅ **JWT Authentication**
- HS256 algorithm
- 24-hour expiration
- Subject: username
- Claim: role

✅ **Cookie Security**
- HttpOnly (prevents XSS)
- Secure flag (HTTPS in production)
- SameSite=Strict (prevents CSRF)

✅ **Database Security**
- SQL injection prevention (parameterized queries)
- Connection pooling
- Proper indexing

---

## 📝 Key Files

| File | Purpose |
|------|---------|
| `backend/server.js` | Express server setup |
| `backend/controllers/authController.js` | Auth logic |
| `backend/middlewares/authMiddleware.js` | JWT verification |
| `backend/models/User.js` | User database operations |
| `frontend/App.jsx` | Main React component |
| `frontend/services/api.js` | API client |
| `frontend/components/ProtectedRoute.jsx` | Route protection |

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <PID> /F

# Verify environment variables
cat .env

# Check database connection
```

### Frontend won't start
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install

# Clear dist folder
rm -r dist
npm run dev
```

### Database connection error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
Solution:
1. Verify MySQL is running
2. Check DB credentials in .env
3. Run `source backend/database.sql` again

### JWT Token Error
```
Invalid token
```
Solution:
1. Clear browser localStorage
2. Logout and login again
3. Check JWT_SECRET matches in backend

---

## 📚 Documentation

- **[README.md](./README.md)** - Project overview
- **[SETUP.md](./SETUP.md)** - Detailed setup guide
- **[API.md](./API.md)** - API documentation

---

## 🚢 Production Deployment

### Backend Deployment Options
- **Heroku** - https://www.heroku.com
- **Railway** - https://railway.app
- **Render** - https://render.com
- **AWS EC2** - https://aws.amazon.com

### Frontend Deployment Options
- **Vercel** - https://vercel.com (recommended for Vite)
- **Netlify** - https://netlify.com
- **GitHub Pages** - https://pages.github.com

### Production Checklist
- [ ] Change JWT_SECRET to strong random string
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for production domain
- [ ] Use strong database password
- [ ] Enable database backups
- [ ] Set secure=true for cookies
- [ ] Add rate limiting
- [ ] Enable logging/monitoring
- [ ] Use environment variables for all secrets

---

## 💡 Pro Tips

1. **Use Thunder Client** in VS Code for API testing
2. **Use React Developer Tools** extension for debugging
3. **Check browser Network tab** for API calls
4. **Check browser Console** for JS errors
5. **Use `console.log()`** in backend for debugging

---

## 📞 Support

If something doesn't work:

1. Check the error message in terminal
2. Review the relevant documentation file
3. Verify environment variables are set
4. Check database connection
5. Look at network requests in browser DevTools

---

## ✨ Next Steps

1. ✅ Start both servers (backend + frontend)
2. ✅ Test the authentication flow
3. ✅ Customize the UI as needed
4. ✅ Add more features (transactions, cards, etc.)
5. ✅ Deploy to production

---

## 📄 License

MIT License - Feel free to use and modify!

---

**Happy Banking! 🏦**

Generated: February 20, 2026
