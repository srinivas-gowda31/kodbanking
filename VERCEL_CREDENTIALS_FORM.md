# 📋 KodBanking - Vercel Variables Checklist

## ✏️ Fill This Form With Your Database Credentials

Use this checklist to gather all values BEFORE adding to Vercel.

---

## 1️⃣ Database Information

### Get these from your database provider:

**PlanetScale Instructions:**
```
1. Go to: https://app.planetscale.com
2. Click "kodbanking" database
3. Click "Passwords"
4. Click "Create .env password"
5. Copy the connection string
6. Extract values below
```

**AWS RDS Instructions:**
```
1. Go to: AWS RDS Dashboard
2. Click your MySQL instance
3. Go to "Connectivity & security"
4. Find the values below
```

---

## 📝 Variable 1: DB_HOST
**Definition**: Your database server address

**Where to find it:**
- PlanetScale: Connection string → `host=...`
- AWS RDS: Endpoint
- DigitalOcean: Connection details → Host

**Your value:**
```
DB_HOST = ________________________________
```

**Example values:**
```
aws.connect.planetscale.com
database-1.cq3szr7npqtr.us-east-1.rds.amazonaws.com
db-mysql-sgp1-36.digitalocean.com
```

---

## 📝 Variable 2: DB_USER
**Definition**: Database username for authentication

**Where to find it:**
- PlanetScale: Connection string → `user=...`
- AWS RDS: Master username (set during creation)
- DigitalOcean: Connection details → User

**Your value:**
```
DB_USER = ________________________________
```

**Example values:**
```
your_username_here
admin
root
```

---

## 📝 Variable 3: DB_PASSWORD
**Definition**: Database password (KEEP SECRET!)

**Where to find it:**
- PlanetScale: Passwords → Password field
- AWS RDS: Master password (you set this)
- DigitalOcean: Connection string → password

**Your value:**
```
DB_PASSWORD = ________________________________
```

**⚠️ SECURITY WARNING**: 
- Never share this password
- Never commit to GitHub
- Keep it safe!

**If password has special characters like $ or &:**
Enclose in quotes: `"pass$word&123"`

---

## 📝 Variable 4: DB_NAME
**Definition**: Name of the database to use

**Your value:**
```
DB_NAME = kodbanking
```

✅ **This is always "kodbanking" - no need to change**

---

## 📝 Variable 5: JWT_SECRET
**Definition**: Secret key for signing JWT tokens (security critical!)

### Option A: Generate Using Terminal (RECOMMENDED)
```bash
# Open terminal/command prompt and run:
openssl rand -base64 32

# Example output:
# I9JU23NF394R6HH7K2M5N8P0Q3R6S9T2V5W8X1Y4Z7A0B3C6D9E2F5G8H1J4M

# Copy the entire output
```

### Option B: Use Pre-generated Secret (for testing)
```
I9JU23NF394R6HH7K2M5N8P0Q3R6S9T2V5W8X1Y4Z7A0B3C6D9E2F5G8H1J4M
```

### Option C: Online Generator
1. Go to: https://www.uuidgenerator.net/
2. Click "Generate" 3-4 times
3. Concatenate all results

**Your value:**
```
JWT_SECRET = ________________________________________________________________________
```

**Requirements:**
- Minimum 32 characters ✅
- Random/unique ✅
- Keep it secret ✅

---

## 📝 Variable 6: JWT_EXPIRES_IN
**Definition**: How long JWT tokens stay valid

**Your value:**
```
JWT_EXPIRES_IN = 24h
```

✅ **Use as-is - means tokens expire after 24 hours**

---

## 📝 Variable 7: NODE_ENV
**Definition**: Environment type (production/development)

**Your value:**
```
NODE_ENV = production
```

✅ **Always "production" for Vercel deployment**

---

## 📝 Variable 8: FRONTEND_URL
**Definition**: Your app's Vercel domain (for CORS)

**How to get this:**
1. Deploy to Vercel first (don't need env vars for initial deploy)
2. After deployment, you'll get a domain like: `https://kodbanking-abc123.vercel.app`
3. Or use: `https://kodbanking.vercel.app` (if you don't add custom domain)

**Your value:**
```
FRONTEND_URL = https://kodbanking.vercel.app
```

Or if Vercel gives you a different domain:
```
FRONTEND_URL = https://kodbanking-YOUR-ID.vercel.app
```

---

## ✅ Complete Verification Checklist

Before uploading to Vercel, verify all values:

### Database Variables
- [ ] DB_HOST is filled in (not empty)
- [ ] DB_HOST looks like a domain (e.g., `aws.connect.planetscale.com`)
- [ ] DB_USER is filled in (not empty)
- [ ] DB_PASSWORD is filled in (not empty)
- [ ] DB_PASSWORD is kept secret (don't share)
- [ ] DB_NAME is `kodbanking`

### JWT Variables
- [ ] JWT_SECRET is filled in
- [ ] JWT_SECRET is 32+ characters long
- [ ] JWT_SECRET is random/unique (not `password123`)
- [ ] JWT_EXPIRES_IN is `24h`

### Deployment Variables
- [ ] NODE_ENV is `production`
- [ ] FRONTEND_URL is filled in
- [ ] FRONTEND_URL starts with `https://`
- [ ] FRONTEND_URL ends with `.vercel.app`

---

## 🚀 Ready to Upload?

When all checkboxes above are ✅:

1. Go to: https://vercel.com/dashboard
2. Click your "kodbanking" project
3. Click "Settings" tab
4. Click "Environment Variables"
5. Add each variable from above, one by one
6. Make sure ALL THREE environments are selected:
   - ☑ Production
   - ☑ Preview
   - ☑ Development
7. Click "Save"
8. Go to "Deployments" tab
9. Click "Redeploy" on latest deployment
10. Wait for build to complete (green checkmark)
11. Click "Visit" to test your app

---

## 📊 Summary Table for Quick Reference

| Variable | Value | Notes |
|----------|-------|-------|
| **DB_HOST** | _________________ | From database provider |
| **DB_USER** | _________________ | From database provider |
| **DB_PASSWORD** | _________________ | From database provider |
| **DB_NAME** | kodbanking | Always same |
| **JWT_SECRET** | _________________ | 32+ chars, keep secret |
| **JWT_EXPIRES_IN** | 24h | Always same |
| **NODE_ENV** | production | Always same |
| **FRONTEND_URL** | https://kodbanking.vercel.app | Update if different |

---

## 🆘 Troubleshooting

### "I don't have my database credentials"
→ Set up database first (PlanetScale/AWS RDS)
→ Then gather credentials
→ Then add to Vercel

### "My database password has special characters"
→ Enclose in quotes in Vercel: `"pass$word&123"`

### "JWT_SECRET generation failed"
→ Use pre-generated one: `I9JU23NF394R6HH7K2M5N8P0Q3R6S9T2V5W8X1Y4Z7A0B3C6D9E2F5G8H1J4M`

### "Database connection error after adding variables"
→ Double-check DB_HOST, DB_USER, DB_PASSWORD
→ Test connection locally: `mysql -h DB_HOST -u DB_USER -p`

### "FRONTEND_URL is wrong"
→ Check your actual Vercel domain
→ Found at: Vercel Dashboard → Your Project → Domain shown at top

---

**Once filled out, you're ready to upload to Vercel!** 🎉
