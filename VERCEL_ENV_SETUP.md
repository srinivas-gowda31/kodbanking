# 📝 Add Environment Variables to Vercel - Step by Step

## 🎯 Quick Summary
You need to add **8 environment variables** to Vercel's dashboard. Follow the exact steps below.

---

## 📍 Where to Add Variables in Vercel

1. Go to: https://vercel.com/dashboard
2. Click your **kodbanking** project
3. Click **Settings** tab (top menu)
4. Click **Environment Variables** (left sidebar)
5. You'll see the form shown in your screenshot

---

## 🔑 All 8 Variables to Add

### Variable 1: DB_HOST
| Field | Value |
|-------|-------|
| **Key** | `DB_HOST` |
| **Value** | Your database host (e.g., `aws.connect.planetscale.com`) |
| **Environments** | ✅ Production ✅ Preview ✅ Development |

**Where to get this:**
- **PlanetScale**: Database → Connect → Copy host from connection string
- **AWS RDS**: Dashboard → Database → Connectivity & security → Endpoint
- **DigitalOcean**: Cluster → Connection details → Host

---

### Variable 2: DB_USER
| Field | Value |
|-------|-------|
| **Key** | `DB_USER` |
| **Value** | Your database username (e.g., `admin`, `root`) |
| **Environments** | ✅ Production ✅ Preview ✅ Development |

**Where to get this:**
- **PlanetScale**: Connection string username (before `@`)
- **AWS RDS**: Master username (set during creation)
- **DigitalOcean**: Connection details → User

---

### Variable 3: DB_PASSWORD
| Field | Value |
|-------|-------|
| **Key** | `DB_PASSWORD` |
| **Value** | Your database password |
| **Environments** | ✅ Production ✅ Preview ✅ Development |

**⚠️ IMPORTANT**: Keep this secure, never share it!

**Where to get this:**
- **PlanetScale**: Passwords → Create .env password → Copy password
- **AWS RDS**: Your master password (set during creation)
- **DigitalOcean**: Connection string password

---

### Variable 4: DB_NAME
| Field | Value |
|-------|-------|
| **Key** | `DB_NAME` |
| **Value** | `kodbanking` |
| **Environments** | ✅ Production ✅ Preview ✅ Development |

This is always the same for this project.

---

### Variable 5: JWT_SECRET
| Field | Value |
|-------|-------|
| **Key** | `JWT_SECRET` |
| **Value** | A random 32+ character string (see below) |
| **Environments** | ✅ Production ✅ Preview ✅ Development |

**Generate a new JWT_SECRET** (pick ONE option):

**Option A: Using OpenSSL** (in terminal)
```bash
openssl rand -base64 32
# Output: I9JU23NF394R6HH7K2M5N8P0Q3R6S9T2V5W8X1Y4Z7A0B3C6D9E2F5G8H1J4M
# Copy the output and use as JWT_SECRET
```

**Option B: Using Online Generator**
1. Go: https://www.uuidgenerator.net/
2. Click "Generate UUID v4"
3. Repeat 2-3 times to get long string
4. Concatenate: `UUID1UUID2UUID3`

**Option C: Use This Pre-generated Secret** (only for testing)
```
I9JU23NF394R6HH7K2M5N8P0Q3R6S9T2V5W8X1Y4Z7A0B3C6D9E2F5G8H1J4M
```

⚠️ For production, generate a new one!

---

### Variable 6: JWT_EXPIRES_IN
| Field | Value |
|-------|-------|
| **Key** | `JWT_EXPIRES_IN` |
| **Value** | `24h` |
| **Environments** | ✅ Production ✅ Preview ✅ Development |

This means tokens expire after 24 hours. Use as-is.

---

### Variable 7: NODE_ENV
| Field | Value |
|-------|-------|
| **Key** | `NODE_ENV` |
| **Value** | `production` |
| **Environments** | ✅ Production ✅ Preview ✅ Development |

Always use `production` for Vercel deployment.

---

### Variable 8: FRONTEND_URL
| Field | Value |
|-------|-------|
| **Key** | `FRONTEND_URL` |
| **Value** | `https://kodbanking.vercel.app` |
| **Environments** | ✅ Production ✅ Preview ✅ Development |

**Replace `kodbanking` with your Vercel app name!**

To find your app name:
1. Go to Vercel Dashboard
2. Click your project
3. Look at the URL: `vercel.com/projects/***-***-***-kodbanking***`
4. Or at top of page: `kodbanking.vercel.app`

---

## ⚡ Step-by-Step Instructions

### STEP 1: Database Setup (Do This First!)
Before adding variables, set up your database:

**If using PlanetScale:**
```bash
1. Go to https://app.planetscale.com
2. Create database: "kodbanking"
3. Go to "Passwords"
4. Create .env password
5. Get credentials (host, user, password)
6. Save: mysql -h HOST -u USER -p < database.sql
```

**If using AWS RDS:**
```bash
1. Create RDS MySQL instance
2. Get endpoint (DB_HOST)
3. Set master username (DB_USER)
4. Set password (DB_PASSWORD)
5. Create database: mysql -h HOST -u USER -p -e "CREATE DATABASE kodbanking;"
6. Run migration: mysql -h HOST -u USER -p < database.sql
```

### STEP 2: Open Vercel Environment Variables
```
1. Go to https://vercel.com/dashboard
2. Click "kodbanking" project
3. Click "Settings" tab
4. Click "Environment Variables" in left sidebar
5. You should see the form
```

### STEP 3: Add Each Variable
For each variable below, repeat:

```
1. In "Key" field, type: DB_HOST
2. In "Value" field, type: your-actual-value
3. Make sure ALL three checkboxes are selected:
   ☑ Production
   ☑ Preview
   ☑ Development
4. Click "Add" or press Enter
5. Do NOT click "Save" yet!
```

### STEP 4: Add All Variables
Repeat STEP 3 for each variable in this order:

```
1. DB_HOST          → your-db-host
2. DB_USER          → your-db-user
3. DB_PASSWORD      → your-db-password
4. DB_NAME          → kodbanking
5. JWT_SECRET       → your-generated-secret
6. JWT_EXPIRES_IN   → 24h
7. NODE_ENV         → production
8. FRONTEND_URL     → https://kodbanking.vercel.app
```

### STEP 5: Save All Variables
1. After adding all 8 variables, click **"Save"** button
2. Vercel will auto-save all variables
3. You'll see a confirmation message

### STEP 6: Trigger Redeployment
1. Go to **"Deployments"** tab
2. Find **last failed** deployment (red icon)
3. Click the **"..."** menu
4. Select **"Redeploy"**
5. Wait for build to complete (should turn green ✅)

---

## 📋 Troubleshooting

### Problem: "Can't see Environment Variables option"
**Solution**: Make sure you're in Settings tab, not Deployments

### Problem: "Variables saved but still getting errors"
**Solution**: 
- Go to Deployments
- Click Redeploy on latest deployment
- Vercel needs to rebuild with new variables

### Problem: "DB_PASSWORD has special characters like $"
**Solution**: Enclose in quotes like: `"pass$word123"`

### Problem: "JWT_SECRET is too short"
**Solution**: Must be 32+ characters. Use: `openssl rand -base64 32`

### Problem: "CORS error after deployment"
**Solution**: 
- Check FRONTEND_URL matches your Vercel domain exactly
- Redeploy
- Clear browser cache

### Problem: "Database connection failed"
**Solution**:
- Verify DB_HOST, DB_USER, DB_PASSWORD are correct
- Test connection: `mysql -h HOST -u USER -p`
- Check database exists: `mysql -h HOST -u USER -p -D kodbanking -e "SELECT 1;"`
- Whitelist Vercel IP or allow all connections

---

## ✅ Verification Checklist

After adding all variables, verify:

- [ ] All 8 variables are visible in Environment Variables list
- [ ] All have "Production", "Preview", "Development" enabled
- [ ] Database credentials are correct (tested locally)
- [ ] JWT_SECRET is 32+ characters
- [ ] FRONTEND_URL matches your Vercel domain
- [ ] "Save" was clicked (no unsaved changes indicator)
- [ ] Latest deployment is building with new variables
- [ ] Build completed successfully (green checkmark)

---

## 📝 Quick Copy-Paste Template

If your database is ready, fill in these values:

```
DB_HOST = [your-db-host from connection string]
DB_USER = [your-db-username]
DB_PASSWORD = [your-db-password]
DB_NAME = kodbanking
JWT_SECRET = I9JU23NF394R6HH7K2M5N8P0Q3R6S9T2V5W8X1Y4Z7A0B3C6D9E2F5G8H1J4M
JWT_EXPIRES_IN = 24h
NODE_ENV = production
FRONTEND_URL = https://kodbanking.vercel.app
```

Then add each to Vercel one by one.

---

## 🚀 After Adding Variables

1. **Redeploy**: Deployments tab → Redeploy latest
2. **Wait**: Build takes ~3 minutes
3. **Test**: Click "Visit" to test the app
4. **Register**: Create test account
5. **Login**: Login with test credentials
6. **Check Balance**: Should work! ✅

---

## 📞 Still Have Issues?

1. Check Vercel logs: Deployments → Latest → View Logs
2. Check database: `mysql -h HOST -u USER -p -D kodbanking -e "SELECT * FROM users;"`
3. Compare your values with examples above
4. Make sure database migration was run

---

**That's it! Add these 8 variables and you're ready to deploy!** 🚀
