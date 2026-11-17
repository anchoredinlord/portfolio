// ============================================================
// PORTFOLIO DATA — Edit this file to personalize your portfolio
// ============================================================

// ── ASSETS ────────────────────────────────────────────────────
export const assets = {
  heroPhoto:  "/images/avatar.png",
  aboutPhoto: "/images/about.png",
  resume:     "/documents/resume.pdf",
  ogImage:    "/images/og-image.jpg",
};

export const personalInfo = {
  name: "Damoze Motuma",
  firstName: "Damoze",
  lastName: "Motuma",
  title: "Senior Software Engineer",
  roles: [
    "Senior Software Engineer",
    "Full-Stack Developer",
    "Backend Developer",
    "AI Integration Engineer",
    "Problem Solver",
  ],
  email: "damozemotumaguyasa@gmail.com",
  phone: "094723693",
  location: "Ethiopia",
  bio: "Passionate software engineer focused on full-stack development, backend systems, database design, and AI integration. I build maintainable, scalable software and love turning complex problems into clean solutions.",
  about: `I'm a passionate software engineer based in Ethiopia with strong interests in full-stack development, backend engineering, database systems, and AI integration. My journey into software started with curiosity about how systems are built from the ground up — and that curiosity continues to drive everything I do.

I am currently pursuing my Bachelor of Science in Software Engineering at Haramaya University (2024–2028). Alongside my studies, I have completed five software projects and accumulated more than 200 GitHub commits — building real-world applications that cover the full stack, from database design and REST APIs to modern React frontends.

I have a solid understanding of backend architecture, API development, database systems, and connecting AI models to Python applications using tools like Ollama. I value writing maintainable, well-structured code, working collaboratively, and continuously improving my craft as an engineer.`,
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
      "Studying software engineering with a focus on full-stack development, database systems, backend architecture, and algorithms at Haramaya University, Ethiopia.",
    achievements: [
      "Software Engineering Student",
      "Full-Stack Development",
      "Database Systems",
      "Backend Architecture",
    ],
  },
];

export const skills = {
  languages: [
    { name: "Python",      level: 82 },
    { name: "Java",        level: 72 },
    { name: "JavaScript",  level: 90 },
    { name: "PHP",         level: 70 },
  ],
  frontend: [
    { name: "React",       level: 85 },
    { name: "Next.js",     level: 82 },
    { name: "JavaScript",  level: 90 },
    { name: "HTML / CSS",  level: 90 },
    { name: "Tailwind CSS",level: 85 },
  ],
  backend: [
    { name: "Python",      level: 82 },
    { name: "FastAPI",     level: 75 },
    { name: "Java",        level: 72 },
    { name: "PHP",         level: 70 },
    { name: "REST APIs",   level: 85 },
  ],
  tools: [
    { name: "Git and GitHub", level: 88 },
    { name: "Docker",       level: 72 },
    { name: "VS Code",      level: 92 },
    { name: "Kiro IDE",     level: 80 },
  ],
};

export const projects = [
  {
    id: 1,
    title: "Student Academic Record Management System",
    description:
      "A full-stack system for managing student records, grades, and attendance with role-based access control for admins, teachers, and students.",
    longDescription:
      "Built a comprehensive academic management platform with real-time grade tracking, automated report generation, attendance management, and a multi-role authentication system.",
    image: "/projects/academic.jpg",
    tags: ["React", "Node.js", "PostgreSQL", "Express", "JWT", "Tailwind CSS"],
    github: "https://github.com/anchoredinlord/student-record-system",
    demo: "https://github.com/anchoredinlord/student-record-system",
    featured: true,
    category: "Full-Stack",
    challenges: [
      "Designed a normalized database schema for complex academic relationships",
      "Implemented role-based access control with JWT authentication",
      "Built automated PDF report generation for academic records",
    ],
    features: [
      "Multi-role authentication (Admin, Teacher, Student)",
      "Grade and attendance tracking",
      "Automated PDF report generation",
      "Analytics dashboard with charts",
    ],
  },
  {
    id: 2,
    title: "Inventory Tracker System",
    description:
      "A full-featured inventory management system for tracking stock levels, products, and purchase orders — with low-stock alerts and an analytics dashboard.",
    longDescription:
      "Built with Python and FastAPI on the backend and React on the frontend. Supports product management, stock tracking, and automated reorder alerts with a reporting dashboard.",
    image: "/projects/inventory.jpg",
    tags: ["Python", "FastAPI", "PostgreSQL", "React", "Tailwind CSS"],
    github: "https://github.com/anchoredinlord/inventory-tracker",
    demo: "https://github.com/anchoredinlord/inventory-tracker",
    featured: true,
    category: "Backend",
    challenges: [
      "Designed a normalized database schema for multi-category stock tracking",
      "Built automated low-stock alert triggers",
      "Implemented fast product lookup with query optimization",
    ],
    features: [
      "Product and category management",
      "Stock level tracking and history",
      "Automated low-stock alerts",
      "Analytics dashboard with inventory reports",
    ],
  },
  {
    id: 3,
    title: "AI Chat Application",
    description:
      "A local AI chat application that connects Python to AI models using Ollama, enabling conversational AI responses without external API dependencies.",
    longDescription:
      "Integrates locally hosted AI models with a Python backend via Ollama. Demonstrates AI model integration, API development, and building practical AI-powered tools.",
    image: "/projects/ai-chat.jpg",
    tags: ["Python", "Ollama", "FastAPI", "AI Integration", "REST API"],
    github: "https://github.com/anchoredinlord/ai-chat-app",
    demo: "https://github.com/anchoredinlord/ai-chat-app",
    featured: true,
    category: "Backend",
    challenges: [
      "Integrating locally hosted AI models with a Python application",
      "Managing model context and conversation history",
      "Building a clean REST API layer over the AI backend",
    ],
    features: [
      "Local AI model integration via Ollama",
      "Conversational context management",
      "FastAPI REST backend",
      "No external AI API dependency",
    ],
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce platform with product management, shopping cart, payment integration, and an admin dashboard for inventory management.",
    longDescription:
      "Full-featured e-commerce solution covering product catalog, cart and checkout flow, payment integration, and an admin panel for managing products and orders.",
    image: "/projects/ecommerce.jpg",
    tags: ["Next.js", "JavaScript", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/anchoredinlord/ecommerce-platform",
    demo: "https://github.com/anchoredinlord/ecommerce-platform",
    featured: true,
    category: "Full-Stack",
    challenges: [
      "Optimized database queries for fast product search and filtering",
      "Built secure checkout and payment flow",
      "Designed responsive UI with complex state management",
    ],
    features: [
      "Product catalog with filtering",
      "Shopping cart and checkout",
      "Admin dashboard for product and order management",
      "Responsive design",
    ],
  },
  {
    id: 5,
    title: "Developer Portfolio Website",
    description:
      "This portfolio — a production-ready personal portfolio built with Next.js, TypeScript, Framer Motion, and Tailwind CSS.",
    longDescription:
      "Showcases modern web development practices including server-side rendering, smooth animations, dark/light mode, SEO optimization, and a contact form with email integration.",
    image: "/projects/portfolio.jpg",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/anchoredinlord",
    demo: "https://damozemotuma.vercel.app",
    featured: false,
    category: "Full-Stack",
    challenges: [
      "Smooth animations without performance degradation",
      "Accessible and SEO-optimized design",
      "Contact form with server-side email integration",
    ],
    features: [
      "Dark / Light mode toggle",
      "Framer Motion animations",
      "Contact form with email integration",
      "Responsive layout for all screen sizes",
    ],
  },
];

export const experience = [
  {
    id: 1,
    role: "Software Engineering Student",
    company: "Haramaya University",
    period: "2024 – Present",
    type: "Education",
    description:
      "Pursuing a Bachelor of Science in Software Engineering, building a strong foundation in software architecture, algorithms, database systems, and full-stack development.",
    achievements: [
      "Completed 5 software development projects alongside coursework",
      "Accumulated 200+ GitHub commits demonstrating consistent practice",
      "Developed full-stack, backend, and AI integration projects",
    ],
    technologies: ["Python", "Java", "JavaScript", "React", "Next.js", "PostgreSQL"],
  },
  {
    id: 2,
    role: "Full-Stack Developer",
    company: "Personal Projects",
    period: "2024 – Present",
    type: "Projects",
    description:
      "Independently designed and developed full-stack web applications covering frontend interfaces, backend APIs, database systems, and AI integration.",
    achievements: [
      "Built a Student Academic Record Management System with role-based access",
      "Built an Inventory Tracker using Python and FastAPI",
      "Developed a local AI chat application using Ollama and Python",
    ],
    technologies: ["React", "Next.js", "Python", "FastAPI", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: 3,
    role: "AI Integration Developer",
    company: "Personal Projects",
    period: "2025 – Present",
    type: "Projects",
    description:
      "Explored AI integration by connecting locally hosted AI models to Python applications using Ollama, building practical AI-powered tools and REST APIs.",
    achievements: [
      "Integrated local AI models into Python applications via Ollama",
      "Built REST API layers for AI-powered conversational tools",
      "Developed an understanding of AI model context management and API design",
    ],
    technologies: ["Python", "Ollama", "FastAPI", "REST APIs", "AI Integration"],
  },
];

export const certifications: {
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
}[] = [];

export const testimonials: {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}[] = [];

export const stats = [
  { label: "Projects Completed", value: 5,   suffix: "" },
  { label: "GitHub Commits",     value: 200, suffix: "+" },
  { label: "Full-Stack Projects",value: 3,   suffix: "" },
  { label: "AI Integrations",    value: 1,   suffix: "+" },
];

export const navLinks = [
  { label: "Home",       href: "#home" },
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];
