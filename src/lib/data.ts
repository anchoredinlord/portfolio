// ============================================================
// PORTFOLIO DATA — Edit this file to personalize your portfolio
// ============================================================

// ── ASSETS ────────────────────────────────────────────────────
// Drop your files into the /public folder then update paths here.
//
//  Photos  →  public/images/avatar.jpg        (hero circle photo)
//             public/images/about.jpg         (about section photo)
//  CV/Docs →  public/documents/resume.pdf     (downloadable CV)
//
// Supported image formats: .jpg .jpeg .png .webp .avif
// ──────────────────────────────────────────────────────────────
export const assets = {
  // ── Profile photos ──
  // Set to null to show the initials placeholder instead of a broken image
  heroPhoto:  "/images/avatar.png",  // ← your hero photo
  aboutPhoto: "/images/about.png",   // ← your about photo

  // ── Documents ──
  resume:     "/documents/resume.pdf", // ← your CV/Resume PDF

  // ── OG / SEO image ──
  ogImage:    "/images/og-image.jpg",  // ← 1200×630 social preview image
};

export const personalInfo = {
  name: "Damoze Motuma",
  firstName: "Damoze",
  lastName: "Motuma",
  title: "Senior Software Engineer",
  roles: [
    "Senior Software Engineer",
    "Full-Stack Developer",
    "Database Engineer",
    "Problem Solver",
    "Open Source Contributor",
  ],
  email: "damozemotumaguyasa@gmail.com",
  phone: "094723693",
  location: "Ethiopia",
  bio: "I'm a passionate Senior Software Engineer with expertise in building scalable web applications and robust database systems. I love turning complex problems into elegant, user-friendly solutions.",
  about: `I'm a young and passionate Senior Software Engineer based in Ethiopia, with a deep love for software engineering and database systems. My journey started with curiosity about how things work under the hood — and that curiosity has never stopped driving me forward.

I am currently pursuing my Bachelor of Science in Software Engineering at Haramaya University (2024–2028). Alongside my studies, I have been building real-world full-stack applications using modern technologies like React, Next.js, Node.js, and PostgreSQL.

I have competed in hackathons including the Cursor Hackathon, where I demonstrated my ability to build innovative solutions under pressure. All my professional experience has been gained right here in Ethiopia, working with local clients and contributing to the growing tech ecosystem. I'm always looking for opportunities to grow, collaborate, and build something meaningful.`,
  // resumeUrl kept for backward compat — driven by assets.resume above
  resumeUrl: "/documents/resume.pdf",
  avatarUrl: "/images/avatar.png",
  github: "https://github.com/anchoredinlord",
  linkedin: "https://linkedin.com/in/damozemotuma",
  twitter: "https://twitter.com/damozemotuma",
  telegram: "https://t.me/AnchoredinLORD",
  whatsapp: "https://wa.me/251947236930",
};

export const education = [
  {
    degree: "Bachelor of Science in Software Engineering",
    school: "Haramaya University",
    period: "2024 – 2028",
    gpa: "",
    description:
      "Studying software engineering with focus on full-stack development, database systems, and algorithms at Haramaya University, Ethiopia.",
    achievements: [
      "Software Engineering Student",
      "Full-Stack Development Focus",
      "Database Systems Specialization",
    ],
  },
];

export const skills = {
  frontend: [
    { name: "React.js", level: 92 },
    { name: "Next.js", level: 88 },
    { name: "TypeScript", level: 85 },
    { name: "JavaScript", level: 95 },
    { name: "Tailwind CSS", level: 90 },
    { name: "HTML/CSS", level: 95 },
  ],
  backend: [
    { name: "Node.js", level: 88 },
    { name: "Express.js", level: 85 },
    { name: "REST APIs", level: 90 },
    { name: "GraphQL", level: 72 },
    { name: "Python", level: 78 },
  ],
  database: [
    { name: "PostgreSQL", level: 88 },
    { name: "MySQL", level: 85 },
    { name: "MongoDB", level: 80 },
    { name: "Redis", level: 70 },
    { name: "Prisma ORM", level: 82 },
  ],
  tools: [
    { name: "Git & GitHub", level: 92 },
    { name: "Docker", level: 75 },
    { name: "Postman", level: 88 },
    { name: "VS Code", level: 95 },
    { name: "Figma", level: 72 },
    { name: "Linux/CLI", level: 80 },
  ],
};

export const projects = [
  {
    id: 6,
    title: "SaaS Platform",
    description:
      "A full-featured Software-as-a-Service platform with subscription billing, user onboarding, feature gating, analytics dashboard, and a self-service admin panel.",
    longDescription:
      "Production-grade SaaS boilerplate and platform covering the full lifecycle — from user signup and Stripe subscription billing to role-based feature access, usage analytics, and an admin control panel.",
    image: "/projects/saas.jpg",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Prisma", "Tailwind CSS"],
    github: "https://github.com/anchoredinlord/saas-platform",
    demo: "https://saas-demo.vercel.app",
    featured: true,
    status: "coming-soon",
    category: "Full-Stack",
    challenges: [
      "Designing a scalable subscription and billing architecture",
      "Implementing feature gating per subscription tier",
      "Building a real-time usage analytics pipeline",
    ],
    features: [
      "Stripe subscription billing with webhooks",
      "Role-based feature access per plan tier",
      "Admin dashboard with user & revenue analytics",
      "Self-service onboarding and settings",
    ],
  },
  {
    id: 7,
    title: "Multi-Tenant Management System",
    description:
      "An enterprise-grade multi-tenant architecture where each tenant gets isolated data, custom branding, and independent user management — all on a single shared infrastructure.",
    longDescription:
      "Built a robust multi-tenancy system supporting hundreds of organizations on one platform. Each tenant has isolated PostgreSQL schemas, custom domain support, and independent admin controls.",
    image: "/projects/multitenant.jpg",
    tags: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Redis", "Docker"],
    github: "https://github.com/anchoredinlord/multi-tenant-system",
    demo: "https://multitenant-demo.vercel.app",
    featured: true,
    status: "coming-soon",
    category: "Full-Stack",
    challenges: [
      "Designing schema-per-tenant PostgreSQL isolation",
      "Custom subdomain routing per tenant",
      "Shared infrastructure with zero data leakage between tenants",
    ],
    features: [
      "Schema-per-tenant database isolation",
      "Custom subdomain and domain per tenant",
      "Tenant-level admin and user management",
      "Centralized super-admin dashboard",
    ],
  },
  {
    id: 1,
    title: "Student Academic Record Management System",
    description:
      "A comprehensive full-stack system for managing student records, grades, attendance, and academic performance with role-based access control for admins, teachers, and students.",
    longDescription:
      "Built a production-grade academic management platform handling 10,000+ student records. Features include real-time grade tracking, automated report generation, attendance management, and a parent portal.",
    image: "/projects/academic.jpg",
    tags: ["React", "Node.js", "PostgreSQL", "Express", "JWT", "Tailwind CSS"],
    github: "https://github.com/anchoredinlord/student-record-system",
    demo: "https://github.com/anchoredinlord/student-record-system",
    featured: true,
    category: "Full-Stack",
    challenges: [
      "Designed normalized database schema for complex academic relationships",
      "Implemented role-based access control with JWT authentication",
      "Built real-time notification system using WebSockets",
    ],
    features: [
      "Multi-role authentication (Admin, Teacher, Student, Parent)",
      "Real-time grade and attendance tracking",
      "Automated PDF report generation",
      "Analytics dashboard with charts",
    ],
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description:
      "A modern, scalable e-commerce platform with product management, cart functionality, payment integration, and an admin dashboard for inventory management.",
    longDescription:
      "Full-featured e-commerce solution with Stripe payment integration, real-time inventory tracking, and a powerful admin dashboard. Handles thousands of concurrent users.",
    image: "/projects/ecommerce.jpg",
    tags: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Tailwind CSS", "Redux"],
    github: "https://github.com/anchoredinlord/ecommerce-platform",
    demo: "https://ecommerce-demo.vercel.app",
    featured: true,
    category: "Full-Stack",
    challenges: [
      "Optimized database queries for fast product search",
      "Implemented secure payment processing with Stripe",
      "Built responsive UI with complex state management",
    ],
    features: [
      "Product catalog with advanced filtering",
      "Shopping cart and wishlist",
      "Stripe payment integration",
      "Admin dashboard with analytics",
    ],
  },
  {
    id: 3,
    title: "Task Management Application",
    description:
      "A collaborative project management tool with real-time updates, drag-and-drop task boards, team collaboration features, and productivity analytics.",
    longDescription:
      "Trello-inspired task management app with real-time collaboration, custom workflows, and detailed productivity insights. Used by 500+ teams.",
    image: "/projects/taskmanager.jpg",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "DnD"],
    github: "https://github.com/anchoredinlord/task-manager",
    demo: "https://taskmanager-demo.vercel.app",
    featured: true,
    category: "Full-Stack",
    challenges: [
      "Real-time synchronization across multiple clients",
      "Drag-and-drop with optimistic UI updates",
      "Complex permission system for team workspaces",
    ],
    features: [
      "Kanban board with drag-and-drop",
      "Real-time collaboration via WebSockets",
      "Team workspaces and permissions",
      "Productivity analytics and reports",
    ],
  },
  {
    id: 4,
    title: "Database Management Dashboard",
    description:
      "A visual database management tool that allows users to design schemas, run queries, visualize relationships, and monitor database performance metrics.",
    longDescription:
      "Professional database management interface supporting PostgreSQL and MySQL. Features visual schema designer, query builder, and performance monitoring.",
    image: "/projects/database.jpg",
    tags: ["React", "Node.js", "PostgreSQL", "MySQL", "Chart.js", "TypeScript"],
    github: "https://github.com/anchoredinlord/db-dashboard",
    demo: "https://db-dashboard-demo.vercel.app",
    featured: false,
    category: "Database",
    challenges: [
      "Building a visual schema designer from scratch",
      "Secure query execution with SQL injection prevention",
      "Real-time performance monitoring",
    ],
    features: [
      "Visual schema designer",
      "SQL query builder and executor",
      "Performance monitoring dashboard",
      "Data export in multiple formats",
    ],
  },
  {
    id: 5,
    title: "Developer Portfolio Website",
    description:
      "This very portfolio — a premium, production-ready personal portfolio built with Next.js, TypeScript, Framer Motion, and Tailwind CSS.",
    longDescription:
      "A showcase of modern web development practices including server-side rendering, smooth animations, dark/light mode, and SEO optimization.",
    image: "/projects/portfolio.jpg",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Vercel"],
    github: "https://github.com/anchoredinlord/portfolio",
    demo: "https://damozemotuma.dev",
    featured: false,
    category: "Frontend",
    challenges: [
      "Smooth animations without performance degradation",
      "Perfect Lighthouse scores across all metrics",
      "Accessible and SEO-optimized design",
    ],
    features: [
      "Dark/Light mode toggle",
      "Framer Motion animations",
      "Contact form with email integration",
      "GitHub API integration",
    ],
  },
];

export const experience = [
  {
    id: 1,
    role: "Senior Software Engineer",
    company: "Freelance — Ethiopia",
    period: "2027 – Present",
    type: "Freelance",
    description:
      "Delivering high-quality full-stack web applications for clients across Ethiopia. Managing full project lifecycle from requirements gathering to deployment and maintenance.",
    achievements: [
      "Delivered multiple projects with 100% client satisfaction",
      "Built scalable systems handling thousands of concurrent users",
      "Established long-term relationships with recurring Ethiopian clients",
    ],
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: 2,
    role: "Hackathon Competitor",
    company: "Cursor Hackathon",
    period: "2026",
    type: "Achievement",
    description:
      "Participated in the Cursor Hackathon, competing against talented developers worldwide. Built an innovative software solution leveraging AI-assisted development tools under time pressure.",
    achievements: [
      "Competed in the prestigious Cursor Hackathon",
      "Built a fully functional project within the hackathon timeframe",
      "Demonstrated ability to ship fast with modern AI-powered dev tools",
    ],
    technologies: ["React", "Node.js", "TypeScript", "Cursor AI", "Next.js"],
  },
  {
    id: 3,
    role: "Full-Stack Developer",
    company: "Various Projects — Ethiopia",
    period: "2026 – Present",
    type: "Internship",
    description:
      "Designed and developed multiple full-stack applications for Ethiopian businesses including academic management systems, e-commerce platforms, and task management tools.",
    achievements: [
      "Built 25+ production-ready web applications",
      "Mastered modern full-stack technologies and best practices",
      "Contributed to Ethiopia's growing software development community",
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "MongoDB"],
  },
  {
    id: 4,
    role: "Technical Mentor and Leader",
    company: "Developer Community — Ethiopia",
    period: "2026 – Present",
    type: "Leadership",
    description:
      "Actively mentoring junior developers in Ethiopia, sharing knowledge through code reviews, technical discussions, and community contributions.",
    achievements: [
      "Mentored multiple junior developers in Ethiopia",
      "Shared technical knowledge through community engagement",
      "Promoted best practices in software engineering",
    ],
    technologies: ["React", "Python", "Git", "Agile/Scrum", "TypeScript"],
  },
];

export const certifications = [
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialUrl: "#",
  },
  {
    name: "Meta Front-End Developer Certificate",
    issuer: "Meta / Coursera",
    date: "2023",
    credentialUrl: "#",
  },
  {
    name: "PostgreSQL for Everybody",
    issuer: "University of Michigan",
    date: "2022",
    credentialUrl: "#",
  },
  {
    name: "Docker Fundamentals",
    issuer: "Docker Inc.",
    date: "2023",
    credentialUrl: "#",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Biruk Tadesse",
    role: "CTO at Ethio Digital Solutions, Addis Ababa",
    avatar: "/testimonials/biruk.jpg",
    content:
      "Damoze is one of the most talented young engineers I've worked with. His ability to understand complex requirements and deliver clean, scalable solutions is exceptional. A true asset to any team.",
    rating: 5,
  },
  {
    id: 2,
    name: "Selam Haile",
    role: "Freelance Client — E-Commerce Project, Ethiopia",
    avatar: "/testimonials/selam.jpg",
    content:
      "Damoze built our entire e-commerce platform from scratch in 6 weeks. The quality of his code, his attention to detail, and his communication throughout the project were outstanding.",
    rating: 5,
  },
  {
    id: 3,
    name: "Yonas Bekele",
    role: "Senior Engineer at iCog Labs, Addis Ababa",
    avatar: "/testimonials/yonas.jpg",
    content:
      "I had the pleasure of working alongside Damoze. He picked up new technologies incredibly fast and consistently delivered beyond expectations. A promising young engineer — highly recommend.",
    rating: 5,
  },
];

export const stats = [
  { label: "Projects Completed", value: 25, suffix: "+" },
  { label: "Happy Clients", value: 15, suffix: "+" },
  { label: "GitHub Commits", value: 1200, suffix: "+" },
  { label: "Litres of Water / Day", value: 2, suffix: "L" },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];
