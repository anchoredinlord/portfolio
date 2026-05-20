"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useEffect, useState } from "react";

// ── Horizontal lines that scroll DOWNWARD ─────────────────────
// Each line spans full width and drifts from top to bottom
const H_LINES = [
  { text: "Damoze Motuma  ·  Senior Software Engineer  ·  Ethiopia  ·  React  ·  Node.js  ·  PostgreSQL  ·  anchoredinlord  ·  Full-Stack Developer  ·  Database Engineer", x:"0%",  delay:0,  dur:18 },
  { text: "git push origin main  ·  npm run build  ·  vercel deploy  ·  docker-compose up  ·  prisma migrate dev  ·  SELECT * FROM projects  ·  useEffect(() => {}, [])", x:"0%",  delay:3,  dur:22 },
  { text: "const engineer = new Damoze()  ·  engineer.build('SaaS')  ·  engineer.deploy('Vercel')  ·  engineer.ship('Ethiopia')  ·  React  ·  TypeScript  ·  Next.js", x:"0%",  delay:6,  dur:20 },
  { text: "01000100 01100001 01101101 01101111 01111010 01100101  ·  Senior Software Engineer  ·  Haramaya University 2024–2028  ·  Cursor Hackathon 2026", x:"0%",  delay:9,  dur:24 },
  { text: "React  ·  Next.js  ·  TypeScript  ·  Node.js  ·  Express  ·  PostgreSQL  ·  MongoDB  ·  Docker  ·  Git  ·  Tailwind CSS  ·  Prisma  ·  REST API", x:"0%",  delay:12, dur:19 },
  { text: "useEffect(() => { fetchData(); }, [])  ·  async/await  ·  JWT Auth  ·  Prisma ORM  ·  JIRU Tech  ·  StartLink Ethiopia  ·  damozemotuma.vercel.app", x:"0%",  delay:15, dur:23 },
  { text: "SELECT * FROM engineers WHERE skill='React'  ·  git commit -m 'feat'  ·  npm install  ·  Open Source  ·  Problem Solver  ·  anchoredinlord", x:"0%",  delay:2,  dur:21 },
  { text: "Damoze Motuma  ·  Reading 2–3 pages/day  ·  Coding 2–3 hours/day  ·  Building scalable apps  ·  Ethiopia  ·  Software Engineering  ·  2024–2028", x:"0%",  delay:7,  dur:25 },
];

export default function GlobalBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme !== "light";

  // Bright emerald green — same as Database skills bar
  const lineColor   = isDark ? "#10b981" : "#059669";
  const lineOpacity = isDark ? 0.55 : 0.22;
  const baseBg      = isDark ? "from-[#020617] via-[#050714] to-[#080b1a]" : "from-white to-white";
  const overlay     = isDark ? "bg-gray-950/50" : "bg-white/82";

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${baseBg}`} />

      {/* Horizontal lines scrolling DOWNWARD */}
      <div
        className="absolute left-0 right-0 bottom-0 overflow-hidden"
        style={{ top: "80px", opacity: lineOpacity }}
      >
        {H_LINES.map((line, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 whitespace-nowrap font-mono select-none pointer-events-none"
            style={{
              color: lineColor,
              fontSize: "11px",
              letterSpacing: "0.05em",
              // Stagger starting positions so lines are spread across the screen
              top: `${(i / H_LINES.length) * 100}%`,
            }}
            initial={{ y: "-100vh" }}
            animate={{ y: "100vh" }}
            transition={{
              duration: line.dur,
              delay: line.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Repeat text to fill full width */}
            {`${line.text}  ·  ${line.text}  ·  ${line.text}`}
          </motion.div>
        ))}
      </div>

      {/* Final overlay */}
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}
