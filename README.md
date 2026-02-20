# KodBanking - Production-Ready Full Stack Banking Application

A complete, production-ready banking application built with modern tech stack.

## 🏗️ Architecture

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** with glassmorphism UI theme
- **React Router** for navigation
- **Axios** for HTTP requests
- Secure token-based authentication

### Backend
- **Node.js + Express.js** REST API
- **JWT Authentication** with HttpOnly cookies
- **BCrypt** for password hashing
- **MySQL** database on Aiven Cloud
- Middleware-based architecture

### Database
- MySQL with Aiven Cloud hosting
- Optimized schema with proper indexing
- Token tracking for JWT validation

## 🚀 Features

✅ User Registration (with default balance of ₹100,000)
✅ Secure JWT Authentication 
✅ Password hashing with bcrypt
✅ Protected routes and endpoints
✅ Check account balance
✅ Animated glassmorphism UI
✅ HttpOnly cookie-based token storage
✅ SQL injection safe queries
✅ Responsive design

## 📋 Project Structure

```
kodbanking/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   └── UserToken.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── accountController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── accountRoutes.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── .env.template
│   ├── database.sql
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.template
│   ├── .gitignore
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── index.html
└── README.md
```

## 🔒 Security Features

- ✅ JWT tokens with HS256 algorithm
- ✅ HttpOnly cookies prevent XSS attacks
- ✅ Bcrypt password hashing (10 salt rounds)
- ✅ SQL injection prevention with parameterized queries
- ✅ CORS security configuration
- ✅ Token verification on every protected request
- ✅ Secure password comparison with bcrypt

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Account
- `GET /api/account/balance` - Get user balance (protected)

## 🛠️ Setup Instructions

See [SETUP.md](./SETUP.md) for detailed setup guide.

## 📝 Environment Variables

See `.env.template` files in both backend and frontend directories.

## 🚦 Running the Application

1. **Backend**
   ```bash
   cd backend
   npm install
   cp .env.template .env  # Configure with your MySQL details
   npm run dev
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.template .env
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

## 📦 Dependencies

### Backend
- express, mysql2, bcryptjs, jsonwebtoken, dotenv, cors, cookie-parser

### Frontend
- react, react-dom, react-router-dom, axios, tailwindcss

## 🧪 Testing

1. Register a new account
2. Login with credentials
3. Click "Check Balance" on dashboard to see encrypted balance

## 📞 Support

For issues or questions, check the logs in both backend and frontend terminals.

## 📄 License

MIT License
