# 🎯 Vercel Environment Variables - Visual Guide

## What You'll See in Vercel Dashboard

This matches the screenshot you showed me.

---

## ✅ Step 1: Navigate to Settings

**In Vercel Dashboard:**

```
https://vercel.com/dashboard
    ↓
Click your project: "kodbanking"
    ↓
Click "Settings" tab (top menu)
    ↓
Click "Environment Variables" (left sidebar)
```

---

## 📍 What You'll See (Visual Layout)

```
┌─────────────────────────────────────────────────────────┐
│ Settings > Environment Variables                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Environment Variables                                   │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Key                    │ Value                     │ │
│ ├─────────────────────────────────────────────────────┤ │
│ │ [Input Field]          │ [Input Field]             │ │
│ │ DB_HOST                │ aws.connect.planetscale   │ │
│ │                        │ .com                      │ │
│ │                        │                           │X│
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌──────────────────────────────────────────────────────┐│
│ │ + Add More                                          ││
│ └──────────────────────────────────────────────────────┘│
│                                                         │
│ [📄 Import .env] or paste contents    [Learn More]    │
│                                                         │
│ [            Deploy            ]                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔢 Adding Variables - Detailed Steps

### Adding Variable 1: DB_HOST

**Step 1a: Click in Key field**
```
┌─────────────────┬───────────────────────────────────┐
│ [Key field]     │ Value field                       │
│ Click here ▼    │                                   │
└─────────────────┴───────────────────────────────────┘
```

**Step 1b: Type the key**
```
DB_HOST
```

**Step 1c: Click in Value field**
```
┌─────────────────┬───────────────────────────────────┐
│ DB_HOST         │ Click here ▼                      │
└─────────────────┴───────────────────────────────────┘
```

**Step 1d: Type the value**
```
aws.connect.planetscale.com
```
(or your actual database host)

**Step 1e: Select environments**

Look for checkboxes below or on the right:
```
☑ Production
☑ Preview
☑ Development
```

✅ **Make sure ALL THREE are checked!**

**Step 1f: Press Enter or click Add**

The variable now appears in the list:
```
DB_HOST = aws.connect.planetscale.com
```

---

### Adding Variable 2-8: Repeat Above

Do the same steps for each variable:

```
2. DB_USER
   ├─ Key: DB_USER
   ├─ Value: your-database-user
   └─ Environments: ☑☑☑

3. DB_PASSWORD  
   ├─ Key: DB_PASSWORD
   ├─ Value: your-password
   └─ Environments: ☑☑☑

4. DB_NAME
   ├─ Key: DB_NAME
   ├─ Value: kodbanking
   └─ Environments: ☑☑☑

5. JWT_SECRET
   ├─ Key: JWT_SECRET
   ├─ Value: I9JU23NF394R6HH...
   └─ Environments: ☑☑☑

6. JWT_EXPIRES_IN
   ├─ Key: JWT_EXPIRES_IN
   ├─ Value: 24h
   └─ Environments: ☑☑☑

7. NODE_ENV
   ├─ Key: NODE_ENV
   ├─ Value: production
   └─ Environments: ☑☑☑

8. FRONTEND_URL
   ├─ Key: FRONTEND_URL
   ├─ Value: https://kodbanking.vercel.app
   └─ Environments: ☑☑☑
```

---

## ✅ Final Check - All Variables Visible

After adding all 8, you should see:

```
┌──────────────────┬──────────────────────────────────┐
│ Key              │ Value                            │
├──────────────────┼──────────────────────────────────┤
│ DB_HOST          │ aws.connect.planetscale.com      │
├──────────────────┼──────────────────────────────────┤
│ DB_USER          │ your-user                        │
├──────────────────┼──────────────────────────────────┤
│ DB_PASSWORD      │ •••••••••••••••••••              │
├──────────────────┼──────────────────────────────────┤
│ DB_NAME          │ kodbanking                       │
├──────────────────┼──────────────────────────────────┤
│ JWT_SECRET       │ I9JU23NF394R6HH7K2M5...         │
├──────────────────┼──────────────────────────────────┤
│ JWT_EXPIRES_IN   │ 24h                              │
├──────────────────┼──────────────────────────────────┤
│ NODE_ENV         │ production                       │
├──────────────────┼──────────────────────────────────┤
│ FRONTEND_URL     │ https://kodbanking.vercel.app    │
└──────────────────┴──────────────────────────────────┘
```

---

## 🚀 Save and Deploy

### Step 1: Click Save Button

```
Look for a "Save" button at the bottom
Usually blue colored button

[       Save       ]
```

This saves all 8 variables.

### Step 2: Go to Deployments

```
https://vercel.com/dashboard
    ↓
Click your project
    ↓
Click "Deployments" tab
```

### Step 3: Find Last Deployment

You should see deployments listed. Find the one that **looks like it failed** (usually red):

```
┌─────────────────────────────────────────────────────┐
│ Deployment History                                  │
├─────────────────────────────────────────────────────┤
│ 🔴 Failed   2:30 AM                    [...]        │
│    feat: update to node.js 24.x                     │
│    Main branch                                      │
├─────────────────────────────────────────────────────┤
│ ✅ Success  1:45 AM                    [...]        │
│ 🔴 Failed   1:10 AM                    [...]        │
└─────────────────────────────────────────────────────┘
```

### Step 4: Click the [...] Menu

On the **most recent failed** deployment, click the three dots menu:

```
🔴 Failed   2:30 AM                    [...]  ← Click here
```

A dropdown menu appears:

```
┌──────────────────┐
│ Redeploy         │ ← Click this
│ Promote          │
│ Inspect          │
│ Delete           │
└──────────────────┘
```

### Step 5: Click "Redeploy"

Click the "Redeploy" option.

Vercel will restart the build with your new environment variables.

### Step 6: Wait for Build

You'll see:

```
Status: Building... (spinning icon)
Build takes: ~2-3 minutes
```

Wait for it to complete. You'll see:

```
✅ Success (green checkmark)
Domains: https://kodbanking.vercel.app
```

### Step 7: Visit Your App

Click the "Visit" button or go to:

```
https://kodbanking.vercel.app
```

You should see the **Login page** with KodBanking logo! 🎉

---

## 🎯 Quick Text Instructions

**What you type in Vercel:**

```
1. Key: DB_HOST
   Value: [your-database-host]
   ✅ All Environments

2. Key: DB_USER
   Value: [your-database-user]
   ✅ All Environments

3. Key: DB_PASSWORD
   Value: [your-database-password]
   ✅ All Environments

4. Key: DB_NAME
   Value: kodbanking
   ✅ All Environments

5. Key: JWT_SECRET
   Value: I9JU23NF394R6HH7K2M5N8P0Q3R6S9T2V5W8X1Y4Z7A0B3C6D9E2F5G8H1J4M
   ✅ All Environments

6. Key: JWT_EXPIRES_IN
   Value: 24h
   ✅ All Environments

7. Key: NODE_ENV
   Value: production
   ✅ All Environments

8. Key: FRONTEND_URL
   Value: https://kodbanking.vercel.app
   ✅ All Environments
```

---

## ❓ Common Questions

### Q: Where exactly is the "Environment Variables" button?
**A**: 
- Click your project
- Click "Settings" (top menu)
- Left sidebar → Click "Environment Variables"

### Q: Do I need to select specific environments?
**A**: YES! Select ALL THREE:
- ☑ Production
- ☑ Preview
- ☑ Development

### Q: What if I don't see "Save" button?
**A**: 
- Variables auto-save as you add them
- Just go to Deployments and Redeploy

### Q: Build still failed after adding variables?
**A**:
- Check variables are spelled correctly
- Check values are correct (test locally first)
- Check DB is online and accessible
- Go to Deployments → Details tab to see full error

### Q: How do I know it worked?
**A**: 
- Build completes with ✅ green checkmark
- App loads at https://kodbanking.vercel.app
- Can register/login/check balance

---

**That's it! Follow these visual steps and you'll be deployed!** 🚀
