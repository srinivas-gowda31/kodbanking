# KodBanking - Vercel Deployment Guide

## 📋 Prerequisites

- GitHub account with the repository pushed
- Vercel account (free at vercel.com)
- MySQL database (PlanetScale, AWS RDS, or any MySQL provider)
- Node.js 18.x
- npm or yarn

---

## 🚀 Deployment Steps

### STEP 1: Prepare the Repository

```bash
# Make sure all changes are committed and pushed to GitHub
cd c:\Users\srini\OneDrive\Desktop\kodbanking
git add -A
git commit -m "feat: prepare for vercel deployment with serverless api"
git push origin main
```

---

### STEP 2: Set Up MySQL Database on Cloud

Choose one of these options:

#### Option A: PlanetScale (Recommended - Free tier available)
1. Go to https://planetscale.com
2. Sign up for free account
3. Create new database: `kodbanking`
4. Go to "Passwords" section
5. Create password and copy connection string

#### Option B: AWS RDS
1. Go to AWS RDS dashboard
2. Create MySQL instance
3. Get host, username, password
4. Create database `kodbanking`

#### Option C: Other providers
- DigitalOcean Databases
- Google Cloud SQL
- Azure Database for MySQL

**Important**: Run the database migration:
```bash
mysql -h <host> -u <user> -p<password> < database.sql
```

---

### STEP 3: Import to Vercel

#### Method 1: Via GitHub (Recommended)
1. Go to https://vercel.com
2. Click "New Project"
3. Click "Import Git Repository"
4. Search and select `srinivas-gowda31/kodbanking`
5. Click "Import"

#### Method 2: Via Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy project
cd c:\Users\srini\OneDrive\Desktop\kodbanking
vercel
```

---

### STEP 4: Configure Environment Variables in Vercel

On Vercel dashboard, go to **Settings → Environment Variables** and add:

```
DB_HOST = your-database-host
DB_USER = your-database-user
DB_PASSWORD = your-database-password
DB_NAME = kodbanking
JWT_SECRET = your-random-secret-key-min-32-chars
JWT_EXPIRES_IN = 24h
NODE_ENV = production
FRONTEND_URL = https://your-app-name.vercel.app
```

**Steps**:
1. In Vercel Dashboard → Your Project
2. Go to Settings tab
3. Click "Environment Variables" in left sidebar
4. Add each variable above
5. Select which environments: Production, Preview, Development
6. Click "Save"

---

### STEP 5: Update Database Security

If using PlanetScale or AWS RDS:

**Whitelist Vercel IP Addresses**:
- PlanetScale: Settings → Integrations → Add Vercel integration (automatic)
- AWS RDS: Edit security group → Add Vercel IPs or allow all outbound

**Or enable access from anywhere (less secure)**:
```sql
-- For testing only, restrict in production
GRANT ALL PRIVILEGES ON kodbanking.* TO 'user'@'%' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
```

---

### STEP 6: Deploy

1. **Push trigger** - Vercel auto-deploys on GitHub push
   ```bash
   git add -A
   git commit -m "deploy: vercel deployment configuration"
   git push origin main
   ```

2. **Manual deployment** - In Vercel Dashboard:
   - Click "Deployments" tab
   - Click "Redeploy" on latest deployment

3. **Check deployment status**:
   - Watch the build logs in Vercel dashboard
   - Should see: "✓ Build completed"

---

## ✅ Verification Steps

### 1. Check if Frontend is Serving
```
https://your-app-name.vercel.app
```
Should see: Login page with KodBanking logo

### 2. Check if API is Working
```bash
# Register endpoint
curl -X POST https://your-app-name.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "uid":"test001",
    "uname":"testuser",
    "password":"Test@123",
    "email":"test@example.com",
    "phone":"9999999999"
  }'

# Expected response:
# {"success":true,"message":"User registered successfully","userId":1}
```

### 3. Test Login Flow
1. Open https://your-app-name.vercel.app
2. Click "Register"
3. Fill form with test data
4. Click "Register"
5. Go to Login
6. Enter credentials
7. Should redirect to Dashboard
8. Click "Check Balance"
9. Should display balance with animations

### 4. Check Logs
```bash
# View Vercel deployment logs
vercel logs

# Or in dashboard:
# Your Project → Deployments → Click latest → View Logs
```

---

## 🔍 Troubleshooting

### Issue: "Cannot find module" error
**Solution**:
- Check API files are in `/api` directory
- Verify package.json dependencies are installed
- Rebuild: Delete `.vercel` folder and redeploy

### Issue: Database connection error (500)
**Solution**:
```bash
# 1. Verify credentials in Vercel env vars are correct
# 2. Check database exists: mysql -h <host> -u <user> -p<password>
# 3. Test connection string:
mysql -h your-host -u your-user -p'your-password' -D kodbanking -e "SELECT * FROM users;"
```

### Issue: CORS error in browser console
**Solution**:
- Check `FRONTEND_URL` env var in Vercel matches actual URL
- Verify vercel.json has correct CORS headers
- Redeploy with `vercel --prod`

### Issue: Cookies not being set
**Solution**:
```javascript
// Frontend should use relative URLs in production
const API_BASE_URL = '';  // Empty string for relative URLs
```

### Issue: "502 Bad Gateway" errors
**Solution**:
- Check database is online and reachable
- Verify JWT_SECRET is set and valid
- Check Node version is 18.x
- Restart the deployment

---

## 📊 Project Structure for Vercel

```
kodbanking/
├── api/                          # Serverless API functions
│   ├── auth/
│   │   ├── register.js           # POST /api/auth/register
│   │   ├── login.js              # POST /api/auth/login
│   │   └── logout.js             # POST /api/auth/logout
│   ├── account/
│   │   └── balance.js            # GET /api/account/balance
│   ├── config/
│   │   └── database.js           # MySQL connection pool
│   ├── models/
│   │   ├── User.js
│   │   └── UserToken.js
│   └── middlewares/
│       └── authMiddleware.js
│
├── frontend/                      # React + Vite frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                       # Legacy (not used in Vercel)
├── vercel.json                    # Vercel configuration
├── .vercelignore                  # Files to ignore
├── .env.example                   # Environment template
├── package.json                   # Root dependencies
└── README.md
```

---

## 🔐 Security Best Practices

### 1. Environment Variables
```
✓ NEVER commit .env files
✓ Use .env.example for template
✓ Change JWT_SECRET to random 32+ character string
✓ Use strong database passwords
✓ Rotate secrets regularly
```

### 2. Database Security
```
✓ Use HTTPS/SSL connection to database
✓ Whitelist Vercel IPs
✓ Use random app-specific passwords
✓ Enable database backups
✓ Use read-only user for non-admin operations
```

### 3. Vercel Project Settings
```
✓ Set "Production" branch to main only
✓ Enable "Require approval before production"
✓ Disable auto-deploy for untrusted branches
✓ Review environment variable access
✓ Monitor deployment logs regularly
```

---

## 📈 Monitoring & Maintenance

### Check Deployment Status
```bash
vercel status
```

### View Logs
```bash
# Recent logs
vercel logs --limit 50

# Filter by endpoint
vercel logs --path /api/auth/login

# Real-time logs
vercel logs --follow
```

### Monitor Database
```bash
# Check active connections
mysql -h <host> -u <user> -p<password> -e "SHOW PROCESSLIST;"

# Monitor slowest queries
mysql -h <host> -u <user> -p<password> -e "SHOW FULL PROCESSLIST WHERE TIME > 5;"
```

---

## 🚀 Post-Deployment

### 1. Test Everything
- [ ] Register works
- [ ] Login works
- [ ] Dashboard loads
- [ ] Check Balance works
- [ ] Logout works
- [ ] Session expiry works

### 2. Performance Optimization
- [ ] Enable Vercel Analytics
- [ ] Set up database query monitoring
- [ ] Configure caching headers

### 3. Backup & Recovery
- [ ] Schedule daily database backups
- [ ] Test restore procedure
- [ ] Document procedure

### 4. Domain Setup (Optional)
1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain
3. Update DNS records per Vercel instructions

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **MySQL Docs**: https://dev.mysql.com/doc/
- **PlanetScale**: https://planetscale.com/docs
- **JWT Docs**: https://jwt.io

---

## 🎯 Next Steps

After deployment:

1. **Monitor** - Watch logs for errors
2. **Test** - Verify all features work
3. **Optimize** - Add caching, CDN
4. **Scale** - Increase database memory if needed
5. **Secure** - Regular security audits
6. **Feature** - Build Step 4 (transactions)

---

**Deployment Date**: February 20, 2026
**Status**: ✅ Ready for Production
**Environment**: Vercel Serverless + Cloud MySQL
