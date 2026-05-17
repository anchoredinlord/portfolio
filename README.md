# 🚀 Premium Developer Portfolio

A production-ready, modern personal portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

![Portfolio Preview](public/og-image.jpg)

## ✨ Features

- **Dark/Light Mode** — Smooth theme toggle with `next-themes`
- **Framer Motion Animations** — Scroll-triggered, hover, and entrance animations
- **Fully Responsive** — Mobile-first design, works on all screen sizes
- **SEO Optimized** — Meta tags, Open Graph, Twitter cards, sitemap, robots.txt
- **Contact Form** — Validated form with Zod + React Hook Form + API route
- **TypeScript** — Fully typed codebase
- **Performance** — Optimized images, lazy loading, code splitting

## 📁 Project Structure

```
portfolion/
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts    # Contact form API
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout + SEO metadata
│   │   ├── page.tsx                # Main page
│   │   ├── sitemap.ts              # Auto-generated sitemap
│   │   └── robots.ts               # Robots.txt
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Sticky navbar with mobile menu
│   │   │   └── Footer.tsx          # Footer with social links
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Hero with animations
│   │   │   ├── About.tsx           # About + stats
│   │   │   ├── Skills.tsx          # Skill bars + tech grid
│   │   │   ├── Projects.tsx        # Filterable project cards
│   │   │   ├── Experience.tsx      # Timeline + certifications
│   │   │   ├── Testimonials.tsx    # Carousel + grid
│   │   │   └── Contact.tsx         # Contact form + info
│   │   └── ui/
│   │       ├── Button.tsx          # Reusable button component
│   │       ├── SectionHeading.tsx  # Animated section headers
│   │       └── ScrollToTop.tsx     # Floating scroll-to-top button
│   └── lib/
│       ├── data.ts                 # ⭐ ALL YOUR CONTENT — edit this!
│       └── utils.ts                # Utility functions
├── public/
│   └── resume.pdf                  # Your resume
├── .env.local                      # Environment variables
└── next.config.ts                  # Next.js configuration
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Theme | next-themes |
| Deployment | Vercel |

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
# Edit .env.local with your values
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
npm start
```

## ✏️ Personalization

**All content is in one file: `src/lib/data.ts`**

Edit these exports to personalize:
- `personalInfo` — Your name, bio, social links, email
- `education` — Your education background
- `skills` — Your technical skills and proficiency levels
- `projects` — Your projects with descriptions and links
- `experience` — Work history, internships, achievements
- `certifications` — Your certifications
- `testimonials` — Client/colleague testimonials

### Adding your profile photo
Replace the avatar placeholder in `Hero.tsx`:
```tsx
// Replace the initials div with:
<Image src="/avatar.jpg" alt="Your Name" fill className="object-cover" />
```
Then add your photo as `public/avatar.jpg`.

## 📧 Contact Form Setup

To enable email sending, configure your SMTP in `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password   # Gmail App Password
CONTACT_EMAIL=your-email@gmail.com
```

Then uncomment the nodemailer code in `src/app/api/contact/route.ts`.

**Gmail App Password:** Google Account → Security → 2-Step Verification → App Passwords

## 🌐 Deployment (Vercel)

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: GitHub + Vercel Dashboard
1. Push to GitHub: `git push origin main`
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Add environment variables in Vercel dashboard
5. Deploy!

### Custom Domain
In Vercel dashboard → Project → Settings → Domains → Add your domain.

## 📊 Performance

Target Lighthouse scores:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🔧 GitHub Setup

```bash
git init
git add .
git commit -m "feat: initial portfolio setup"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

## 📄 License

MIT License — feel free to use this as a template for your own portfolio.

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Framer Motion.
