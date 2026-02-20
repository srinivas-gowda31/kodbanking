# 🚀 KodBanking - Vercel Deployment Quick Start

## ⚡ 2-Minute Setup

### Step 1: Prepare Database (2 min)
```bash
# Option A: PlanetScale (easiest)
# 1. Sign up: https://planetscale.com
# 2. Create database "kodbanking"
# 3. Get connection string from passwords section
# 4. Copy: host, username, password

# Option B: AWS RDS
# 1. Create MySQL instance
# 2. Get host, username, password
# 3. Create database manually

# Run migrations with your connection
mysql -h YOUR_HOST -u YOUR_USER -p YOUR_PASSWORD < database.sql
```

### Step 2: Deploy to Vercel (2 min)

**Via GitHub (Recommended)**:
1. Go to https://vercel.com
2. Click "New Project"
3. Select `srinivas-gowda31/kodbanking`
4. Click "Import"

**Setup Environment Variables**:
1. In Vercel dashboard, click your project
2. Go to Settings → Environment Variables
3. Add these variables:
   ```
   DB_HOST
   DB_USER
   DB_PASSWORD
   DB_NAME
   JWT_SECRET
   JWT_EXPIRES_IN
   NODE_ENV
   FRONTEND_URL
   ```
4. Click Save
5. Vercel will auto-redeploy

### Step 3: Test (1 min)
```
Go to: https://your-app-name.vercel.app
Login with test credentials
Click "Check Balance"
✓ Done!
```

---

## 🎯 Full Deployment Checklist

### Pre-Deployment
- [ ] Database set up (PlanetScale / AWS / other)
- [ ] Database migration run (`database.sql` imported)
- [ ] GitHub repository updated and pushed
- [ ] Vercel account created

### During Deployment
- [ ] Project imported to Vercel
- [ ] Environment variables added
- [ ] Build completes successfully
- [ ] No build errors in logs

### Post-Deployment
- [ ] https://your-app.vercel.app loads
- [ ] Register endpoint works
- [ ] Login endpoint works
- [ ] Dashboard loads
- [ ] Balance check works
- [ ] Logout works

---

## 📝 Environment Variables Needed

Copy and update with YOUR values:

```env
# Database Connection
DB_HOST=aws.connect.planetscale.com
DB_USER=xxxxxxx
DB_PASSWORD=pscale_pw_xxxxxxx
DB_NAME=kodbanking

# JWT Settings
JWT_SECRET=your-super-secret-key-32-chars-minimum-here
JWT_EXPIRES_IN=24h

# Deployment Settings
NODE_ENV=production
FRONTEND_URL=https://your-app-name.vercel.app
```

---

## ✅ Verification Commands

```bash
# Test register
curl -X POST https://your-app.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"uid":"u1","uname":"test","password":"Test@123","email":"test@example.com","phone":"9999999999"}'

# Expected: {"success":true,"message":"User registered successfully","userId":1}
```

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Database connection error | Verify credentials in Vercel env vars |
| "Cannot find module" error | Check API folder structure in /api |
| CORS error | Ensure FRONTEND_URL matches Vercel URL |
| Cookies not working | Use relative URLs (empty baseURL) |
| 502 Bad Gateway | Check database is online |

---

## 📞 Need Help?

1. Check logs: Vercel Dashboard → Deployments → View Logs
2. Read full guide: VERCEL_DEPLOYMENT.md
3. Check API endpoints: https://your-app.vercel.app/api/
4. Test database: `mysql -h HOST -u USER -p PASSWORD -D kodbanking`

---

## 🎉 You're Live!

Your KodBanking app is now deployed on Vercel with:
- ✅ Secure JWT authentication
- ✅ MySQL database connection
- ✅ Responsive dashboard
- ✅ Balance checking
- ✅ Production-ready code

**Next**: Monitor logs, gather feedback, plan Step 4!

---

**Time to deploy**: ~5 minutes
**Vercel free tier**: Up to 6GB serverless function memory
**Database**: Choose your provider (free tier available on most)
