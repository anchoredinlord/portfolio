"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useEffect, useState } from "react";

// ── 7 horizontal scrolling lines only ────────────────────────
const H_LINES = [
  { text: "Damoze Motuma  ·  Senior Software Engineer  ·  Ethiopia  ·  React  ·  Node.js  ·  PostgreSQL  ·  anchoredinlord", y:"10%", dir: 1,  dur:50, delay:0  },
  { text: "git push origin main  ·  npm run build  ·  vercel deploy  ·  docker-compose up  ·  prisma migrate dev  ·  SELECT * FROM projects", y:"22%", dir:-1, dur:55, delay:5  },
  { text: "const engineer = new Damoze()  ·  engineer.build('SaaS')  ·  engineer.deploy('Vercel')  ·  engineer.ship('Ethiopia')", y:"34%", dir: 1,  dur:52, delay:10 },
  { text: "01000100 01100001 01101101 01101111 01111010 01100101  ·  Full-Stack Developer  ·  Database Engineer  ·  Problem Solver", y:"46%", dir:-1, dur:58, delay:3  },
  { text: "React  ·  Next.js  ·  TypeScript  ·  Node.js  ·  Express  ·  PostgreSQL  ·  MongoDB  ·  Docker  ·  Git  ·  Tailwind CSS", y:"58%", dir: 1,  dur:53, delay:8  },
  { text: "useEffect(() => { fetchData(); }, [])  ·  async/await  ·  REST API  ·  JWT Auth  ·  Prisma ORM  ·  Haramaya University", y:"70%", dir:-1, dur:56, delay:2  },
  { text: "Senior Software Engineer  ·  Cursor Hackathon 2026  ·  JIRU Tech  ·  StartLink Ethiopia  ·  damozemotuma.vercel.app", y:"82%", dir: 1,  dur:51, delay:12 },
];

export default function GlobalBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme !== "light";

  // Emerald green — same as Database skills bar — bright and visible
  const lineColor = isDark ? "#10b981" : "#059669";
  const lineOpacity = isDark ? 0.55 : 0.25;

  const baseBg = isDark
    ? "from-[#020617] via-[#050714] to-[#080b1a]"
    : "from-white to-white";

  const overlay = isDark ? "bg-gray-950/50" : "bg-white/82";

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${baseBg}`} />

      {/* Horizontal emerald lines — the only animation */}
      <div
        className="absolute left-0 right-0 bottom-0 overflow-hidden"
        style={{ top: "80px", opacity: lineOpacity }}
      >
        {H_LINES.map((line, i) => (
          <motion.div
            key={i}
            className="absolute whitespace-nowrap font-mono select-none pointer-events-none"
            style={{
              top: line.y,
              color: lineColor,
              fontSize: "11px",
              letterSpacing: "0.05em",
            }}
            initial={{ x: line.dir === 1 ? "-110%" : "110%" }}
            animate={{ x: line.dir === 1 ? "110%" : "-110%" }}
            transition={{
              duration: line.dur,
              delay: line.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {line.text}
          </motion.div>
        ))}
      </div>

      {/* Final overlay — white in light mode, dark in dark mode */}
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}
