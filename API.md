# KodBanking API Documentation

Complete API reference for KodBanking backend.

## Base URL

```
http://localhost:5000
```

## Authentication

All protected endpoints require a valid JWT token in HttpOnly cookie.

The token is automatically set by the login endpoint and included in requests.

## Endpoints

### 1. User Registration

**POST** `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "uid": "UID001",
  "uname": "johndoe",
  "password": "securePassword123",
  "email": "john@example.com",
  "phone": "9876543210"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": 1
}
```

**Errors:**
- `400`: All fields are required
- `400`: Username already exists
- `400`: Email already exists
- `400`: UID already exists
- `500`: Server error

### 2. User Login

**POST** `/api/auth/login`

Login with username and password. Returns JWT token as HttpOnly cookie.

**Request Body:**
```json
{
  "uname": "johndoe",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "username": "johndoe",
  "role": "customer"
}
```

**Cookie:**
```
Set-Cookie: authToken=<jwt-token>; HttpOnly; Secure; SameSite=Strict; Max-Age=86400000
```

**Errors:**
- `400`: Username and password required
- `401`: Invalid credentials
- `500`: Server error

### 3. User Logout

**POST** `/api/auth/logout`

Logout user and clear authentication.

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### 4. Check Balance (Protected)

**GET** `/api/account/balance`

Get user's account balance. Requires valid JWT token.

**Headers:**
```
Cookie: authToken=<jwt-token>
```

**Response (200):**
```json
{
  "success": true,
  "username": "johndoe",
  "balance": 100000,
  "currency": "₹"
}
```

**Errors:**
- `401`: No token provided
- `401`: Invalid or expired token
- `500`: Server error

## JWT Token Structure

```
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "sub": "johndoe",
  "role": "customer",
  "iat": 1702567890,
  "exp": 1702654290
}

Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

- **sub**: Username
- **role**: User role (customer)
- **iat**: Issued at time
- **exp**: Expiration time (24 hours from issuance)

**Algorithm**: HS256
**Expiry**: 24 hours

## Database Schema

### users

| Column | Type | Notes |
|--------|------|-------|
| id | INT | Primary Key, Auto Increment |
| uid | VARCHAR(50) | Unique |
| uname | VARCHAR(50) | Unique |
| password | VARCHAR(255) | Hashed with bcrypt |
| email | VARCHAR(100) | Unique |
| phone | VARCHAR(20) | |
| role | VARCHAR(20) | Default: 'customer' |
| balance | DECIMAL(15,2) | Default: 100000 |
| created_at | TIMESTAMP | Auto timestamp |

### user_tokens

| Column | Type | Notes |
|--------|------|-------|
| id | INT | Primary Key, Auto Increment |
| uname | VARCHAR(50) | Foreign Key to users |
| token | LONGTEXT | JWT token |
| created_at | TIMESTAMP | Auto timestamp |

## Error Codes

| Code | Message | Cause |
|------|---------|-------|
| 400 | All fields are required | Missing required field |
| 400 | Username already exists | Username taken |
| 400 | Email already exists | Email taken |
| 400 | UID already exists | UID taken |
| 401 | Invalid credentials | Wrong password or username |
| 401 | No token provided | Missing authentication |
| 401 | Invalid or expired token | Invalid/expired token |
| 500 | Server error | Database/server error |

## Security

✅ Passwords are hashed with bcrypt (10 salt rounds)
✅ JWT tokens use HS256 algorithm
✅ Tokens stored in database for validation
✅ HttpOnly cookies prevent XSS
✅ Parameterized queries prevent SQL injection
✅ SameSite=Strict prevents CSRF
✅ Token expiry after 24 hours

## Example Requests

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "UID001",
    "uname": "johndoe",
    "password": "securePassword123",
    "email": "john@example.com",
    "phone": "9876543210"
  }'
```

### Login User

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "uname": "johndoe",
    "password": "securePassword123"
  }'
```

### Check Balance

```bash
curl -X GET http://localhost:5000/api/account/balance \
  -b cookies.txt
```

### Logout

```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -b cookies.txt
```

## Rate Limiting

No rate limiting implemented in base version. 

For production, implement:
```javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 attempts
});

app.post('/api/auth/login', loginLimiter, authController.login);
```

## CORS Configuration

**Allowed Origins**: `http://localhost:5173`
**Credentials**: Allowed
**Methods**: GET, POST, OPTIONS

For production, update in `server.js`:
```javascript
cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
})
```

## Monitoring & Logging

Errors are logged to console. For production, use:
- Winston for logging
- Sentry for error tracking
- Datadog for monitoring

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## Future Enhancements

- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Transaction history
- [ ] Money transfers
- [ ] Account settings
- [ ] Profile picture upload
- [ ] Account statements
- [ ] Push notifications
- [ ] API key management
- [ ] Webhook support
