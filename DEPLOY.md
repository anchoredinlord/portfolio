# 🚀 Deployment Guide — Damoze Motuma Portfolio

## Step 1 — Push to GitHub

Run these commands in your terminal (inside the project folder):

```bash
git init
git add .
git commit -m "feat: portfolio v1 — Damoze Motuma"
git branch -M main
git remote add origin https://github.com/anchoredinlord/portfolio.git
git push -u origin main
```

> If asked for credentials, use your GitHub username and a Personal Access Token
> (GitHub → Settings → Developer Settings → Personal Access Tokens → Generate new token)

---

## Step 2 — Deploy on Vercel

1. Go to **https://vercel.com** → Sign up / Log in with GitHub
2. Click **"Add New Project"**
3. Click **"Import"** next to `anchoredinlord/portfolio`
4. Framework: **Next.js** (auto-detected)
5. Leave all settings as default
6. Click **"Deploy"**

Your site will be live in ~60 seconds at:
```
https://portfolio-anchoredinlord.vercel.app
```

---

## Step 3 — Add Environment Variables on Vercel

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these one by one:

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | Get from https://resend.com (free) |
| `CONTACT_EMAIL` | `damozemotumaguyasa@gmail.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-vercel-url.vercel.app` |

After adding variables:
**Deployments → click ⋯ → Redeploy**

---

## Step 4 — Set up Resend (contact form emails)

1. Go to **https://resend.com** → Sign up free
2. Dashboard → API Keys → Create API Key → copy it
3. Paste it as `RESEND_API_KEY` in Vercel (Step 3)
4. Redeploy

Now every contact form submission sends an email to your Gmail.

---

## Step 5 — Custom Domain (optional)

In Vercel Dashboard → Your Project → Settings → Domains:
- Add `damozemotuma.dev` or any domain you own
- Follow the DNS instructions Vercel gives you

---

## Updating the site after deployment

Every time you make changes:
```bash
git add .
git commit -m "update: description of what you changed"
git push
```
Vercel auto-deploys in ~30 seconds. No manual steps needed.

---

## Adding your CV after deployment

```bash
# Copy your CV to:
public/documents/resume.pdf

# Then push:
git add public/documents/resume.pdf
git commit -m "add: resume CV"
git push
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Build fails on Vercel | Check the build logs in Vercel dashboard |
| Contact form not sending | Check RESEND_API_KEY is set in Vercel env vars |
| Images not showing | Make sure files are committed to Git (`git add public/`) |
| Site shows old version | Hard refresh: Ctrl+Shift+R |
