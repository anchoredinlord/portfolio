"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useEffect, useState } from "react";

// ── Horizontal scrolling lines only — clean and light ────────
const H_LINES = [
  { text: "01000100 01100001 01101101 01101111 01111010 01100101  →  Damoze Motuma — Senior Software Engineer — Ethiopia  →  anchoredinlord", y:"12%", dir: 1,  dur:45, delay:0  },
  { text: "npm run build  ←  git push origin main  ←  vercel deploy --prod  ←  docker-compose up  ←  prisma migrate dev", y:"24%", dir:-1, dur:50, delay:4  },
  { text: "const portfolio = new Engineer('Damoze').build()  →  SELECT * FROM projects ORDER BY stars DESC  →  React Node PostgreSQL", y:"36%", dir: 1,  dur:48, delay:8  },
  { text: "useEffect(() => { fetchProjects(); }, [])  ←  interface Engineer { skills: string[] }  ←  res.status(200).json({ ok: true })", y:"48%", dir:-1, dur:52, delay:2  },
  { text: "01010011 01100101 01101110 01101001 01101111 01110010  →  Senior Software Engineer  →  Haramaya University 2024–2028  →  Ethiopia", y:"60%", dir: 1,  dur:46, delay:10 },
  { text: "git commit -m 'feat: premium portfolio'  ←  SELECT name FROM engineers WHERE skill='React'  ←  docker build -t app .", y:"72%", dir:-1, dur:44, delay:6  },
  { text: "async function fetchData() { await api() }  →  pg.connect(DATABASE_URL)  →  export default function App()  →  tailwind.config.js", y:"84%", dir: 1,  dur:49, delay:14 },
];

// ── Horizontal line component ─────────────────────────────────
function HLine({ text, y, dir, dur, delay, color }: {
  text: string; y: string; dir: number; dur: number; delay: number; color: string;
}) {
  return (
    <motion.div
      className="absolute whitespace-nowrap font-mono select-none pointer-events-none"
      style={{ top: y, color, fontSize: "11px", letterSpacing: "0.04em" }}
      initial={{ x: dir === 1 ? "-110%" : "110%" }}
      animate={{ x: dir === 1 ? "110%" : "-110%" }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
    >
      {text}
    </motion.div>
  );
}

// ── Monitor SVG ───────────────────────────────────────────────
function MonitorSVG({ isDark }: { isDark: boolean }) {
  const s  = isDark ? "#10b981" : "#059669";
  const bg = isDark ? "#0f172a" : "#f0fdf4";
  const sc = isDark ? "#020617" : "#dcfce7";
  return (
    <svg viewBox="0 0 320 240" className="w-full h-auto" aria-hidden="true">
      <rect x="10" y="10" width="300" height="190" rx="12" fill={bg} stroke={s} strokeWidth="2"/>
      <rect x="20" y="20" width="280" height="165" rx="6" fill={sc}/>
      <text x="30" y="44"  fontFamily="monospace" fontSize="9" fill="#10b981">const App = () =&gt; &#123;</text>
      <text x="30" y="58"  fontFamily="monospace" fontSize="9" fill="#34d399">  const [data, setData] = useState([]);</text>
      <text x="30" y="72"  fontFamily="monospace" fontSize="9" fill="#10b981">  useEffect(() =&gt; &#123; fetchData(); &#125;, []);</text>
      <text x="30" y="86"  fontFamily="monospace" fontSize="9" fill="#6ee7b7">  return &lt;Dashboard data=&#123;data&#125; /&gt;;</text>
      <text x="30" y="100" fontFamily="monospace" fontSize="9" fill="#10b981">&#125;;</text>
      <text x="30" y="120" fontFamily="monospace" fontSize="9" fill="#34d399">$ npm run deploy</text>
      <text x="30" y="134" fontFamily="monospace" fontSize="9" fill="#10b981">✓ Deployed successfully</text>
      <rect x="30" y="145" width="6" height="10" fill="#10b981" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0;0.9" dur="1.2s" repeatCount="indefinite"/>
      </rect>
      <rect x="145" y="200" width="30" height="20" rx="3" fill={isDark?"#064e3b":"#bbf7d0"}/>
      <rect x="120" y="218" width="80" height="8"  rx="4" fill={isDark?"#064e3b":"#bbf7d0"}/>
    </svg>
  );
}

// ── Laptop SVG ────────────────────────────────────────────────
function LaptopSVG({ isDark }: { isDark: boolean }) {
  const s  = isDark ? "#10b981" : "#059669";
  const bg = isDark ? "#0f172a" : "#f0fdf4";
  const sc = isDark ? "#020617" : "#dcfce7";
  return (
    <svg viewBox="0 0 360 260" className="w-full h-auto" aria-hidden="true">
      <rect x="30" y="10" width="300" height="190" rx="10" fill={bg} stroke={s} strokeWidth="1.5"/>
      <rect x="40" y="20" width="280" height="170" rx="5" fill={sc}/>
      <text x="50" y="44"  fontFamily="monospace" fontSize="8" fill="#10b981">// Senior Software Engineer</text>
      <text x="50" y="58"  fontFamily="monospace" fontSize="8" fill="#34d399">class Damoze extends Engineer &#123;</text>
      <text x="50" y="72"  fontFamily="monospace" fontSize="8" fill="#10b981">  skills = ['React','Node','PostgreSQL'];</text>
      <text x="50" y="86"  fontFamily="monospace" fontSize="8" fill="#6ee7b7">  location = 'Ethiopia';</text>
      <text x="50" y="100" fontFamily="monospace" fontSize="8" fill="#34d399">  async build(idea: string) &#123;</text>
      <text x="50" y="114" fontFamily="monospace" fontSize="8" fill="#10b981">    return await ship(idea);</text>
      <text x="50" y="128" fontFamily="monospace" fontSize="8" fill="#34d399">  &#125;</text>
      <text x="50" y="142" fontFamily="monospace" fontSize="8" fill="#10b981">&#125;</text>
      <text x="50" y="162" fontFamily="monospace" fontSize="8" fill="#34d399">$ git push origin main</text>
      <text x="50" y="176" fontFamily="monospace" fontSize="8" fill="#10b981">✓ Pipeline passed · Deployed</text>
      <rect x="10"  y="200" width="340" height="14" rx="4" fill={isDark?"#064e3b":"#bbf7d0"} stroke={s} strokeWidth="1"/>
      {[0,1,2,3,4,5,6,7,8,9].map(i=>(
        <rect key={i} x={20+i*32} y="204" width="26" height="6" rx="2"
          fill={isDark?"#065f46":"#a7f3d0"} opacity="0.7"/>
      ))}
    </svg>
  );
}

// ── Main GlobalBackground ─────────────────────────────────────
export default function GlobalBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme !== "light";

  // Emerald green — same as Database skill color
  const lineColor = isDark ? "#10b981" : "#059669";

  const baseBg  = isDark
    ? "from-[#020617] via-[#050714] to-[#080b1a]"
    : "from-white via-emerald-50/20 to-white";

  const gridC   = isDark ? "rgba(16,185,129,0.12)" : "rgba(5,150,105,0.05)";
  const orb1    = isDark ? "rgba(16,185,129,0.10)" : "rgba(16,185,129,0.04)";
  const orb2    = isDark ? "rgba(16,185,129,0.06)" : "rgba(16,185,129,0.03)";
  const overlay = isDark ? "bg-gray-950/60"        : "bg-white/85";
  const svgOp   = isDark ? 0.12 : 0.08;
  const lineOp  = isDark ? 0.18 : 0.07;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }} aria-hidden="true">

      {/* 1 — Base gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${baseBg} transition-all duration-700`}/>

      {/* 2 — Subtle grid */}
      <div className="absolute inset-0" style={{
        opacity: 0.05,
        backgroundImage:`
          linear-gradient(${gridC} 1px,transparent 1px),
          linear-gradient(90deg,${gridC} 1px,transparent 1px)`,
        backgroundSize:"80px 80px",
      }}/>

      {/* 3 — Horizontal emerald green lines — below navbar */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden"
        style={{ top:"80px", opacity: lineOp }}>
        {H_LINES.map((l, i) => (
          <HLine key={i} {...l} color={lineColor} />
        ))}
      </div>

      {/* 4 — Monitor SVG top-left — desktop only */}
      <motion.div className="absolute hidden md:block"
        style={{ top:"8%", left:"1%", width:"clamp(130px,13vw,220px)", opacity:svgOp }}
        animate={{ y:[0,-10,0] }}
        transition={{ duration:9, repeat:Infinity, ease:"easeInOut" }}>
        <MonitorSVG isDark={isDark}/>
      </motion.div>

      {/* 5 — Laptop SVG bottom-right — desktop only */}
      <motion.div className="absolute hidden md:block"
        style={{ bottom:"5%", right:"1%", width:"clamp(140px,14vw,240px)", opacity:svgOp }}
        animate={{ y:[0,8,0] }}
        transition={{ duration:11, repeat:Infinity, ease:"easeInOut", delay:2 }}>
        <LaptopSVG isDark={isDark}/>
      </motion.div>

      {/* 6 — Two soft orbs */}
      <motion.div className="absolute rounded-full blur-3xl"
        style={{ top:"20%", left:"5%", width:400, height:400,
          background:`radial-gradient(circle,${orb1} 0%,transparent 70%)` }}
        animate={{ scale:[1,1.2,1], opacity:[0.5,0.8,0.5] }}
        transition={{ duration:14, repeat:Infinity, ease:"easeInOut" }}/>
      <motion.div className="absolute rounded-full blur-3xl"
        style={{ bottom:"15%", right:"5%", width:450, height:450,
          background:`radial-gradient(circle,${orb2} 0%,transparent 70%)` }}
        animate={{ scale:[1.1,1,1.1], opacity:[0.4,0.7,0.4] }}
        transition={{ duration:16, repeat:Infinity, ease:"easeInOut", delay:5 }}/>

      {/* 7 — Final overlay */}
      <div className={`absolute inset-0 transition-all duration-700 ${overlay}`}/>

      {/* 8 — Navbar fade */}
      <div className="absolute left-0 right-0 h-12 pointer-events-none"
        style={{
          top:"80px",
          background: isDark
            ? "linear-gradient(to bottom,rgba(2,6,23,0.4) 0%,transparent 100%)"
            : "linear-gradient(to bottom,rgba(255,255,255,0.3) 0%,transparent 100%)",
        }}/>
    </div>
  );
}
