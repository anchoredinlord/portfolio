# 📁 How to Upload Your Files (Photos, CV, Documents)

This guide covers everything — locally and on Vercel.

---

## 📸 Adding Your Profile Photos

The site uses **two separate photos** — one for each section:

| Photo | Where it shows | Recommended style |
|-------|---------------|-------------------|
| `public/images/avatar.jpg` | **Hero section** — circular crop | Square, face centred, any background |
| `public/images/about.jpg` | **About section** — tall portrait frame | Portrait (3:4 ratio), professional look |

### Step 1 — Prepare your photos
- Format: `.jpg`, `.jpeg`, `.png`, or `.webp`
- `avatar.jpg` → **500×500 px** minimum (square, face centred)
- `about.jpg`  → **480×640 px** minimum (portrait, 3:4 ratio works best)
- Keep each file under **500 KB** for fast loading

### Step 2 — Drop them in the right folder
```
public/
  images/
    avatar.jpg    ← Hero section (circle photo)
    about.jpg     ← About / Who I Am section (portrait photo)
```

### Step 3 — That's it
Both photos load automatically. No code changes needed.

> **If you want different filenames**, update `src/lib/data.ts`:
> ```ts
> export const assets = {
>   heroPhoto:  "/images/your-hero-photo.jpg",
>   aboutPhoto: "/images/your-about-photo.jpg",
>   ...
> }
> ```

> **If no photo is found**, the site shows your initials (DM) — no broken images.

---

## 📄 Adding Your CV / Resume

### Step 1 — Prepare your PDF
- Format: `.pdf`
- Recommended filename: `resume.pdf`

### Step 2 — Drop it here
```
public/
  documents/
    resume.pdf    ← Your CV
```

### Step 3 — That's it
The Download CV button in the Navbar, Hero, About section, and Footer all link to it automatically.

> **To add more documents** (cover letter, certificates, etc.):
> 1. Drop the PDF in `public/documents/`
> 2. Add a link in `src/components/layout/Footer.tsx` under the Documents section

---

## 🚀 Deploying to Vercel

### Option A — GitHub + Vercel (recommended)

**1. Push to GitHub**
```bash
git init
git add .
git commit -m "feat: portfolio with photos and CV"
git branch -M main
git remote add origin https://github.com/damozemotuma/portfolio.git
git push -u origin main
```

**2. Connect to Vercel**
- Go to [vercel.com](https://vercel.com) → New Project
- Import your GitHub repo
- Framework: **Next.js** (auto-detected)
- Click **Deploy**

**3. Add environment variables on Vercel**
In Vercel dashboard → Project → Settings → Environment Variables:
```
SMTP_HOST         = smtp.gmail.com
SMTP_PORT         = 587
SMTP_USER         = damozemotumaguyasa@gmail.com
SMTP_PASS         = your-gmail-app-password
CONTACT_EMAIL     = damozemotumaguyasa@gmail.com
NEXT_PUBLIC_SITE_URL = https://your-vercel-url.vercel.app
```

**4. Your files are deployed**
Photos and documents in `/public` are automatically served by Vercel's CDN.

---

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 🔄 Updating Files After Deployment

### Update your photo
1. Replace `public/images/avatar.jpg` with your new photo (same filename)
2. `git add . && git commit -m "update: profile photo" && git push`
3. Vercel auto-deploys in ~30 seconds

### Update your CV
1. Replace `public/documents/resume.pdf` with your new PDF
2. `git add . && git commit -m "update: resume" && git push`
3. Done — the download link stays the same

---

## 📂 Complete Public Folder Structure

```
public/
├── images/
│   ├── avatar.jpg          ← Your hero photo (add this)
│   ├── about.jpg           ← Your about photo (add this, can be same)
│   ├── og-image.jpg        ← Social preview 1200×630 (optional)
│   └── avatar-placeholder.svg  ← Auto-used when no photo found
├── documents/
│   ├── resume.pdf          ← Your CV (add this)
│   └── README.txt          ← Instructions
└── favicon.ico             ← Browser tab icon (optional, replace)
```

---

## ✏️ Changing Any Content

**All content lives in one file: `src/lib/data.ts`**

| What to change | Where |
|----------------|-------|
| Name, email, phone | `personalInfo` object |
| Photo paths | `assets` object |
| CV path | `assets.resume` |
| Skills | `skills` object |
| Projects | `projects` array |
| Experience | `experience` array |
| Testimonials | `testimonials` array |

---

## 🆘 Troubleshooting

| Problem | Fix |
|---------|-----|
| Photo not showing | Check filename matches exactly (case-sensitive on Linux/Vercel) |
| CV not downloading | Make sure file is in `public/documents/resume.pdf` |
| Broken image on Vercel | Ensure file was committed to Git (`git add public/`) |
| Image too slow | Compress it at [squoosh.app](https://squoosh.app) before uploading |
