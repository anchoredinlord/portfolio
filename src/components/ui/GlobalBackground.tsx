"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const CODE_LINES = [
  { text: "const dev = new Engineer('Damoze');",          x: "3%",  delay: 0,  dur: 18 },
  { text: "SELECT * FROM projects WHERE status='live';",  x: "12%", delay: 3,  dur: 22 },
  { text: "git commit -m 'feat: new feature'",            x: "22%", delay: 6,  dur: 20 },
  { text: "npm run build && npm run deploy",              x: "33%", delay: 1,  dur: 25 },
  { text: "interface Engineer { skills: string[] }",      x: "44%", delay: 8,  dur: 19 },
  { text: "docker-compose up --build",                    x: "55%", delay: 4,  dur: 23 },
  { text: "async function fetchData() { await ... }",     x: "65%", delay: 11, dur: 21 },
  { text: "pg.query('INSERT INTO users VALUES ($1)', [])",x: "74%", delay: 2,  dur: 24 },
  { text: "export default function App() { return ... }", x: "83%", delay: 7,  dur: 17 },
  { text: "useEffect(() => { fetchData(); }, []);",       x: "91%", delay: 14, dur: 26 },
  { text: "const [state, setState] = useState(null);",    x: "7%",  delay: 9,  dur: 20 },
  { text: "router.get('/api/v1/users', authMiddleware)",  x: "28%", delay: 5,  dur: 22 },
  { text: "tailwind.config = { darkMode: 'class' }",      x: "50%", delay: 12, dur: 18 },
  { text: "prisma migrate dev --name init",               x: "70%", delay: 16, dur: 24 },
  { text: "res.status(200).json({ success: true });",     x: "88%", delay: 10, dur: 21 },
];

const BINARY_COLS = [
  { x: "2%",  delay: 0,    dur: 12 }, { x: "8%",  delay: 4,   dur: 15 },
  { x: "14%", delay: 8,    dur: 11 }, { x: "20%", delay: 2,   dur: 14 },
  { x: "26%", delay: 6,    dur: 13 }, { x: "32%", delay: 10,  dur: 16 },
  { x: "38%", delay: 1,    dur: 12 }, { x: "44%", delay: 5,   dur: 15 },
  { x: "50%", delay: 9,    dur: 11 }, { x: "56%", delay: 3,   dur: 14 },
  { x: "62%", delay: 7,    dur: 13 }, { x: "68%", delay: 11,  dur: 16 },
  { x: "74%", delay: 0.5,  dur: 12 }, { x: "80%", delay: 4.5, dur: 15 },
  { x: "86%", delay: 8.5,  dur: 11 }, { x: "92%", delay: 2.5, dur: 14 },
];

function BinaryColumn({ x, delay, dur, color }: { x: string; delay: number; dur: number; color: string }) {
  const bits = Array.from({ length: 18 }, (_, i) => ({
    val: Math.random() > 0.5 ? "1" : "0",
    opacity: Math.max(0.04, 0.7 - i * 0.04),
  }));
  return (
    <motion.div
      className="absolute top-0 flex flex-col font-mono text-xs select-none pointer-events-none"
      style={{ left: x }}
      initial={{ y: "-100%" }}
      animate={{ y: "110%" }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
    >
      {bits.map((b, i) => (
        <span key={i} className="leading-5" style={{ color, opacity: b.opacity }}>
          {b.val}
        </span>
      ))}
    </motion.div>
  );
}

function MonitorSVG({ isDark }: { isDark: boolean }) {
  const stroke = isDark ? "#7c3aed" : "#6d28d9";
  const bg = isDark ? "#0f172a" : "#f5f3ff";
  const screen = isDark ? "#020617" : "#ede9fe";
  return (
    <svg viewBox="0 0 320 240" className="w-full h-auto" aria-hidden="true">
      <rect x="10" y="10" width="300" height="190" rx="12" fill={bg} stroke={stroke} strokeWidth="2" />
      <rect x="20" y="20" width="280" height="165" rx="6" fill={screen} />
      <text x="30" y="45"  fontFamily="monospace" fontSize="9" fill="#7c3aed">const App = () =&gt; &#123;</text>
      <text x="30" y="60"  fontFamily="monospace" fontSize="9" fill="#06b6d4">  const [data, setData] = useState([]);</text>
      <text x="30" y="75"  fontFamily="monospace" fontSize="9" fill="#10b981">  useEffect(() =&gt; &#123;</text>
      <text x="30" y="90"  fontFamily="monospace" fontSize="9" fill="#06b6d4">    fetchData().then(setData);</text>
      <text x="30" y="105" fontFamily="monospace" fontSize="9" fill="#10b981">  &#125;, []);</text>
      <text x="30" y="120" fontFamily="monospace" fontSize="9" fill="#a78bfa">  return (</text>
      <text x="30" y="135" fontFamily="monospace" fontSize="9" fill="#06b6d4">    &lt;Dashboard data=&#123;data&#125; /&gt;</text>
      <text x="30" y="150" fontFamily="monospace" fontSize="9" fill="#a78bfa">  );</text>
      <text x="30" y="165" fontFamily="monospace" fontSize="9" fill="#7c3aed">&#125;;</text>
      <rect x="30" y="170" width="6" height="10" fill="#7c3aed" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0;0.9" dur="1.2s" repeatCount="indefinite" />
      </rect>
      <rect x="145" y="200" width="30" height="20" rx="3" fill={isDark ? "#1e1b4b" : "#ddd6fe"} />
      <rect x="120" y="218" width="80" height="8" rx="4" fill={isDark ? "#1e1b4b" : "#ddd6fe"} />
    </svg>
  );
}

function LaptopSVG({ isDark }: { isDark: boolean }) {
  const stroke = isDark ? "#06b6d4" : "#0891b2";
  const bg = isDark ? "#0f172a" : "#f0fdff";
  const screen = isDark ? "#020617" : "#ecfeff";
  return (
    <svg viewBox="0 0 360 260" className="w-full h-auto" aria-hidden="true">
      <rect x="30" y="10" width="300" height="190" rx="10" fill={bg} stroke={stroke} strokeWidth="1.5" />
      <rect x="40" y="20" width="280" height="170" rx="5" fill={screen} />
      <text x="50" y="45"  fontFamily="monospace" fontSize="8" fill="#10b981">// Senior Software Engineer</text>
      <text x="50" y="60"  fontFamily="monospace" fontSize="8" fill="#7c3aed">class Damoze extends Engineer &#123;</text>
      <text x="50" y="75"  fontFamily="monospace" fontSize="8" fill="#06b6d4">  skills = ['React','Node','PostgreSQL'];</text>
      <text x="50" y="90"  fontFamily="monospace" fontSize="8" fill="#a78bfa">  location = 'Ethiopia';</text>
      <text x="50" y="105" fontFamily="monospace" fontSize="8" fill="#06b6d4">  async build(idea) &#123;</text>
      <text x="50" y="120" fontFamily="monospace" fontSize="8" fill="#10b981">    return await ship(idea);</text>
      <text x="50" y="135" fontFamily="monospace" fontSize="8" fill="#06b6d4">  &#125;</text>
      <text x="50" y="150" fontFamily="monospace" fontSize="8" fill="#7c3aed">&#125;</text>
      <text x="50" y="170" fontFamily="monospace" fontSize="8" fill="#10b981">$ npm run deploy</text>
      <text x="50" y="183" fontFamily="monospace" fontSize="8" fill="#06b6d4">✓ Deployed to production</text>
      <rect x="10" y="200" width="340" height="14" rx="4" fill={isDark ? "#1e1b4b" : "#cffafe"} stroke={stroke} strokeWidth="1" />
      {[0,1,2,3,4,5,6,7,8,9].map(i => (
        <rect key={i} x={20 + i * 32} y="204" width="26" height="6" rx="2"
          fill={isDark ? "#312e81" : "#a5f3fc"} opacity="0.7" />
      ))}
    </svg>
  );
}

function CircuitSVG({ isDark }: { isDark: boolean }) {
  const lineColor = isDark ? "rgba(124,58,237,0.4)" : "rgba(109,40,217,0.3)";
  const lineColor2 = isDark ? "rgba(6,182,212,0.3)" : "rgba(8,145,178,0.25)";
  const nodeStroke = isDark ? "#7c3aed" : "#6d28d9";
  const nodeFill = isDark ? "#7c3aed" : "#8b5cf6";
  const chipBg = isDark ? "#0f172a" : "#f5f3ff";
  const chipStroke = isDark ? "#06b6d4" : "#0891b2";
  return (
    <svg viewBox="0 0 400 400" className="w-full h-auto" aria-hidden="true">
      {[40,80,120,160,200,240,280,320,360].map((y, i) => (
        <line key={`h${i}`} x1="0" y1={y} x2="400" y2={y}
          stroke={lineColor} strokeWidth="0.5" strokeDasharray="8 4" />
      ))}
      {[40,80,120,160,200,240,280,320,360].map((x, i) => (
        <line key={`v${i}`} x1={x} y1="0" x2={x} y2="400"
          stroke={lineColor2} strokeWidth="0.5" strokeDasharray="8 4" />
      ))}
      {[80,160,240,320].map(x =>
        [80,160,240,320].map(y => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="5" fill={chipBg} stroke={nodeStroke} strokeWidth="1.5" opacity="0.7" />
            <circle cx={x} cy={y} r="2" fill={nodeFill} opacity="0.9" />
          </g>
        ))
      )}
      <rect x="155" y="155" width="90" height="90" rx="4" fill={chipBg} stroke={chipStroke} strokeWidth="1.5" opacity="0.7" />
      <text x="200" y="196" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={chipStroke} opacity="0.9">CPU</text>
      <text x="200" y="208" textAnchor="middle" fontFamily="monospace" fontSize="6" fill={nodeStroke} opacity="0.8">DAMOZE</text>
      {[165,185,205,225].map((x, i) => (
        <g key={`pin-t${i}`}>
          <line x1={x} y1="145" x2={x} y2="155" stroke={chipStroke} strokeWidth="1.5" opacity="0.6" />
          <line x1={x} y1="245" x2={x} y2="255" stroke={chipStroke} strokeWidth="1.5" opacity="0.6" />
        </g>
      ))}
      {[165,185,205,225].map((y, i) => (
        <g key={`pin-s${i}`}>
          <line x1="145" y1={y} x2="155" y2={y} stroke={nodeStroke} strokeWidth="1.5" opacity="0.6" />
          <line x1="245" y1={y} x2="255" y2={y} stroke={nodeStroke} strokeWidth="1.5" opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

export default function GlobalBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Use dark as default until mounted (avoids flash)
  const isDark = !mounted || resolvedTheme !== "light";

  // Theme-aware colors
  const baseBg        = isDark ? "from-gray-950 via-[#080b1a] to-[#050714]"
                                : "from-slate-100 via-violet-50 to-indigo-50";
  const gridColor1    = isDark ? "rgba(124,58,237,0.35)"  : "rgba(109,40,217,0.12)";
  const gridColor2    = isDark ? "rgba(6,182,212,0.12)"   : "rgba(8,145,178,0.08)";
  const binaryColor   = isDark ? "#7c3aed"                : "#8b5cf6";
  const codeColors    = isDark
    ? ["#7c3aed", "#06b6d4", "#10b981"]
    : ["#6d28d9", "#0891b2", "#059669"];
  const orb1          = isDark ? "rgba(124,58,237,0.12)"  : "rgba(139,92,246,0.08)";
  const orb2          = isDark ? "rgba(6,182,212,0.08)"   : "rgba(6,182,212,0.06)";
  const scanColor     = isDark
    ? "linear-gradient(90deg, transparent, rgba(124,58,237,0.35), rgba(6,182,212,0.35), transparent)"
    : "linear-gradient(90deg, transparent, rgba(109,40,217,0.15), rgba(8,145,178,0.15), transparent)";
  const finalOverlay  = isDark ? "bg-gray-950/65" : "bg-white/40";
  const svgOpacity    = isDark ? 0.12 : 0.18;
  const binaryOpacity = isDark ? 0.28 : 0.12;
  const codeOpacity   = isDark ? 0.18 : 0.10;

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${baseBg} transition-all duration-700`} />

      {/* Circuit grid */}
      <div
        className="absolute inset-0 opacity-[0.06] transition-opacity duration-700"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor1} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor1} 1px, transparent 1px),
            linear-gradient(${gridColor2} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor2} 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
        }}
      />

      {/* Binary rain */}
      <div className="absolute inset-0 overflow-hidden" style={{ opacity: binaryOpacity }}>
        {BINARY_COLS.map((col, i) => (
          <BinaryColumn key={i} {...col} color={binaryColor} />
        ))}
      </div>

      {/* Floating code lines */}
      <div className="absolute inset-0 overflow-hidden" style={{ opacity: codeOpacity }}>
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xs whitespace-nowrap select-none"
            style={{ left: line.x, bottom: "-2rem" }}
            initial={{ y: 0 }}
            animate={{ y: "-110vh" }}
            transition={{ duration: line.dur, delay: line.delay, repeat: Infinity, ease: "linear" }}
          >
            <span style={{ color: codeColors[i % 3] }}>{line.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Monitor — top left */}
      <motion.div
        className="absolute"
        style={{ top: "8%", left: "2%", width: "clamp(140px,16vw,260px)", opacity: svgOpacity }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <MonitorSVG isDark={isDark} />
      </motion.div>

      {/* Laptop — bottom right */}
      <motion.div
        className="absolute"
        style={{ bottom: "6%", right: "2%", width: "clamp(160px,18vw,300px)", opacity: svgOpacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <LaptopSVG isDark={isDark} />
      </motion.div>

      {/* Circuit — top right */}
      <motion.div
        className="absolute"
        style={{ top: "5%", right: "3%", width: "clamp(120px,14vw,240px)", opacity: svgOpacity * 0.8 }}
        animate={{ rotate: [0, 3, 0, -3, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <CircuitSVG isDark={isDark} />
      </motion.div>

      {/* Circuit — bottom left */}
      <motion.div
        className="absolute"
        style={{ bottom: "5%", left: "3%", width: "clamp(100px,12vw,200px)", opacity: svgOpacity * 0.7 }}
        animate={{ rotate: [0, -3, 0, 3, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      >
        <CircuitSVG isDark={isDark} />
      </motion.div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute rounded-full blur-3xl transition-all duration-700"
        style={{ top: "15%", left: "10%", width: 500, height: 500,
          background: `radial-gradient(circle, ${orb1} 0%, transparent 70%)` }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl transition-all duration-700"
        style={{ bottom: "10%", right: "10%", width: 600, height: 600,
          background: `radial-gradient(circle, ${orb2} 0%, transparent 70%)` }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Scanline sweep */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ background: scanColor }}
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
      />

      {/* Final overlay — lightens in light mode, darkens in dark mode */}
      <div className={`absolute inset-0 transition-all duration-700 ${finalOverlay}`} />
    </div>
  );
}
