"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useEffect, useState, useRef } from "react";

// ── Deterministic data (no Math.random = no hydration mismatch) ──────────
const CODE_LINES = [
  { text: "const dev = new Engineer('Damoze');",           x: "2%",  delay: 0,   dur: 22 },
  { text: "SELECT * FROM projects WHERE status='live';",   x: "11%", delay: 4,   dur: 26 },
  { text: "git commit -m 'feat: premium portfolio'",       x: "21%", delay: 8,   dur: 20 },
  { text: "npm run build && vercel deploy",                x: "32%", delay: 2,   dur: 28 },
  { text: "interface Engineer { skills: string[] }",       x: "43%", delay: 10,  dur: 22 },
  { text: "docker-compose up --build -d",                  x: "54%", delay: 5,   dur: 25 },
  { text: "async function fetchData() { await api() }",    x: "64%", delay: 13,  dur: 23 },
  { text: "pg.query('INSERT INTO users VALUES ($1)')",     x: "73%", delay: 3,   dur: 27 },
  { text: "export default function App() { ... }",         x: "82%", delay: 7,   dur: 19 },
  { text: "useEffect(() => { fetchData(); }, []);",        x: "90%", delay: 15,  dur: 29 },
  { text: "const [state, setState] = useState(null);",     x: "6%",  delay: 11,  dur: 21 },
  { text: "router.post('/api/v1/auth', middleware)",        x: "27%", delay: 6,   dur: 24 },
  { text: "prisma.user.create({ data: payload })",         x: "49%", delay: 14,  dur: 20 },
  { text: "res.status(200).json({ success: true });",      x: "87%", delay: 9,   dur: 26 },
];

const BINARY_COLS = [
  { x:"3%",  delay:0,   dur:14 }, { x:"9%",  delay:5,   dur:17 },
  { x:"15%", delay:10,  dur:13 }, { x:"21%", delay:2,   dur:16 },
  { x:"27%", delay:7,   dur:15 }, { x:"33%", delay:12,  dur:18 },
  { x:"39%", delay:1,   dur:14 }, { x:"45%", delay:6,   dur:17 },
  { x:"51%", delay:11,  dur:13 }, { x:"57%", delay:3,   dur:16 },
  { x:"63%", delay:8,   dur:15 }, { x:"69%", delay:13,  dur:18 },
  { x:"75%", delay:0.5, dur:14 }, { x:"81%", delay:5.5, dur:17 },
  { x:"87%", delay:9.5, dur:13 }, { x:"93%", delay:3.5, dur:16 },
];

// Pure binary sequence — alternating 0 and 1, no random
const BITS = [1,0,1,0,1,1,0,1,0,0,1,0,1,1,0,1,0,0,1,0,1,0];

// ── Horizontal scrolling code lines (left↔right, underlaying binary) ─────
// direction: 1 = left-to-right,  -1 = right-to-left
const H_LINES = [
  // Row 1 — left to right
  { text: "01001000 01100101 01101100 01101100 01101111  →  const greet = () => 'Hello, World!';  →  SELECT name FROM engineers WHERE skill='React';", y:"8%",  dir: 1,  dur:35, delay:0,   size:10 },
  // Row 2 — right to left
  { text: "npm install next react typescript tailwindcss framer-motion  ←  git push origin main  ←  vercel deploy --prod  ←  docker build -t app .", y:"16%", dir:-1, dur:40, delay:3,   size:10 },
  // Row 3 — left to right
  { text: "function buildPortfolio(dev: Engineer): Website { return dev.skills.map(ship); }  →  01110000 01110010 01101111  →  pg.connect(DATABASE_URL)", y:"25%", dir: 1,  dur:38, delay:6,   size:10 },
  // Row 4 — right to left
  { text: "useEffect(() => { fetchProjects(); }, [])  ←  interface Project { id: number; title: string; }  ←  prisma migrate dev", y:"34%", dir:-1, dur:42, delay:1,   size:10 },
  // Row 5 — left to right
  { text: "01000100 01100001 01101101 01101111 01111010 01100101  →  Damoze Motuma — Senior Software Engineer — Ethiopia  →  anchoredinlord", y:"43%", dir: 1,  dur:36, delay:9,   size:10 },
  // Row 6 — right to left
  { text: "SELECT * FROM projects ORDER BY created_at DESC  ←  const router = express.Router()  ←  docker-compose up --build -d  ←  git log --oneline", y:"52%", dir:-1, dur:44, delay:4,   size:10 },
  // Row 7 — left to right
  { text: "export async function GET(req: Request) { const data = await db.query(); return Response.json(data); }  →  01110011 01110101 01100011 01100011 01100101 01110011 01110011", y:"61%", dir: 1,  dur:39, delay:7,   size:10 },
  // Row 8 — right to left
  { text: "tailwind.config = { darkMode: 'class', theme: { extend: {} } }  ←  npm run build  ←  vercel --prod  ←  0xDEADBEEF  ←  0xFF7C3AED", y:"70%", dir:-1, dur:37, delay:2,   size:10 },
  // Row 9 — left to right
  { text: "const [theme, setTheme] = useState('dark')  →  01101100 01101001 01110110 01100101  →  LIVE  →  Full-Stack Developer  →  React Node PostgreSQL", y:"79%", dir: 1,  dur:41, delay:11,  size:10 },
  // Row 10 — right to left
  { text: "Haramaya University 2024–2028  ←  Software Engineering  ←  01000101 01110100 01101000 01101001 01101111 01110000 01101001 01100001  ←  Ethiopia", y:"88%", dir:-1, dur:43, delay:5,   size:10 },
];

// ── Horizontal line component ─────────────────────────────────
function HorizontalCodeLine({ text, y, dir, dur, delay, size, color }: {
  text: string; y: string; dir: number; dur: number; delay: number; size: number; color: string;
}) {
  // dir 1 = starts off-screen left, moves right
  // dir -1 = starts off-screen right, moves left
  const startX = dir === 1 ? "-110%" : "110%";
  const endX   = dir === 1 ? "110%"  : "-110%";

  return (
    <motion.div
      className="absolute whitespace-nowrap font-mono select-none pointer-events-none"
      style={{ top: y, fontSize: size, color, letterSpacing: "0.05em" }}
      initial={{ x: startX }}
      animate={{ x: endX }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
    >
      {text}
    </motion.div>
  );
}

// ── Floating particles (fixed positions) ─────────────────────
const PARTICLES = [
  { x:"8%",  y:"12%", size:3, dur:6,  delay:0   },
  { x:"18%", y:"35%", size:2, dur:8,  delay:1   },
  { x:"28%", y:"68%", size:4, dur:5,  delay:2   },
  { x:"42%", y:"22%", size:2, dur:9,  delay:0.5 },
  { x:"55%", y:"78%", size:3, dur:7,  delay:1.5 },
  { x:"67%", y:"45%", size:2, dur:6,  delay:3   },
  { x:"76%", y:"15%", size:4, dur:8,  delay:0.8 },
  { x:"85%", y:"60%", size:2, dur:5,  delay:2.2 },
  { x:"92%", y:"30%", size:3, dur:7,  delay:1.2 },
  { x:"12%", y:"85%", size:2, dur:9,  delay:3.5 },
  { x:"35%", y:"50%", size:3, dur:6,  delay:4   },
  { x:"60%", y:"90%", size:2, dur:8,  delay:2.8 },
];

// ── Canvas-based PURE BINARY rain ────────────────────────────
function MatrixCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const FONT_SIZE = 14;
    // Only 0 and 1
    const CHARS = ["0", "1"];

    // Each column tracks its Y position and a speed multiplier
    let cols: { y: number; speed: number }[] = [];
    const initCols = () => {
      const count = Math.floor(canvas.width / FONT_SIZE);
      cols = Array.from({ length: count }, (_, i) => ({
        y:     (i % 7) * -20,          // stagger start positions
        speed: 0.4 + (i % 5) * 0.15,  // deterministic varied speeds
      }));
    };
    initCols();
    window.addEventListener("resize", initCols);

    let frame = 0;
    const tick = () => {
      frame++;

      // Fade trail
      ctx.fillStyle = isDark
        ? "rgba(2, 6, 23, 0.08)"
        : "rgba(245, 243, 255, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${FONT_SIZE}px 'Courier New', monospace`;

      cols.forEach((col, i) => {
        const x   = i * FONT_SIZE;
        const yPx = col.y * FONT_SIZE;

        // Alternate 0/1 based on column index + frame for variety
        const bit = CHARS[(i + frame + Math.floor(col.y)) % 2];

        // Bright head character — pure white/violet glow
        if (isDark) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
          ctx.shadowColor = "#7c3aed";
          ctx.shadowBlur  = 8;
        } else {
          ctx.fillStyle = "rgba(109, 40, 217, 0.85)";
          ctx.shadowColor = "#7c3aed";
          ctx.shadowBlur  = 4;
        }
        ctx.fillText(bit, x, yPx);

        // Second character — dimmer
        ctx.shadowBlur = 0;
        ctx.fillStyle = isDark
          ? "rgba(139, 92, 246, 0.45)"
          : "rgba(109, 40, 217, 0.25)";
        ctx.fillText(
          CHARS[(i + frame + Math.floor(col.y) + 1) % 2],
          x, yPx - FONT_SIZE
        );

        // Third — even dimmer
        ctx.fillStyle = isDark
          ? "rgba(6, 182, 212, 0.18)"
          : "rgba(8, 145, 178, 0.10)";
        ctx.fillText(
          CHARS[(i + frame + Math.floor(col.y) + 2) % 2],
          x, yPx - FONT_SIZE * 2
        );

        // Advance column
        col.y += col.speed;

        // Reset when off screen
        if (yPx > canvas.height + FONT_SIZE * 3) {
          col.y = -Math.floor(Math.random() * 20);
        }
      });

      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", initCols);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: isDark ? 0.65 : 0.28 }}
      aria-hidden="true"
    />
  );
}

// ── Binary rain column ────────────────────────────────────────
function BinaryColumn({ x, delay, dur, color }: { x:string; delay:number; dur:number; color:string }) {
  return (
    <motion.div
      className="absolute top-0 flex flex-col font-mono text-[11px] select-none pointer-events-none"
      style={{ left: x }}
      initial={{ y: "-100%" }}
      animate={{ y: "110%" }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
    >
      {BITS.map((b, i) => (
        <span key={i} className="leading-[18px]"
          style={{ color, opacity: Math.max(0.03, 0.65 - i * 0.03) }}>
          {b}
        </span>
      ))}
    </motion.div>
  );
}

// ── Floating code line ────────────────────────────────────────
function CodeLine({ text, x, delay, dur, color }: { text:string; x:string; delay:number; dur:number; color:string }) {
  return (
    <motion.div
      className="absolute font-mono text-[11px] whitespace-nowrap select-none pointer-events-none"
      style={{ left: x, bottom: "-1.5rem", color }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: "-110vh", opacity: [0, 0.7, 0.7, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
    >
      {text}
    </motion.div>
  );
}

// ── Floating particle dot ─────────────────────────────────────
function Particle({ x, y, size, dur, delay, color }: {
  x:string; y:string; size:number; dur:number; delay:number; color:string
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color }}
      animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.6, 1] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ── Monitor SVG ───────────────────────────────────────────────
function MonitorSVG({ isDark }: { isDark: boolean }) {
  const s = isDark ? "#7c3aed" : "#6d28d9";
  const bg = isDark ? "#0f172a" : "#f5f3ff";
  const sc = isDark ? "#020617" : "#ede9fe";
  return (
    <svg viewBox="0 0 320 240" className="w-full h-auto" aria-hidden="true">
      <rect x="10" y="10" width="300" height="190" rx="12" fill={bg} stroke={s} strokeWidth="2"/>
      <rect x="20" y="20" width="280" height="165" rx="6" fill={sc}/>
      <text x="30" y="44"  fontFamily="monospace" fontSize="9" fill="#7c3aed">const App = () =&gt; &#123;</text>
      <text x="30" y="58"  fontFamily="monospace" fontSize="9" fill="#06b6d4">  const [data, setData] = useState([]);</text>
      <text x="30" y="72"  fontFamily="monospace" fontSize="9" fill="#10b981">  useEffect(() =&gt; &#123;</text>
      <text x="30" y="86"  fontFamily="monospace" fontSize="9" fill="#06b6d4">    fetchData().then(setData);</text>
      <text x="30" y="100" fontFamily="monospace" fontSize="9" fill="#10b981">  &#125;, []);</text>
      <text x="30" y="114" fontFamily="monospace" fontSize="9" fill="#a78bfa">  return &lt;Dashboard data=&#123;data&#125; /&gt;;</text>
      <text x="30" y="128" fontFamily="monospace" fontSize="9" fill="#7c3aed">&#125;;</text>
      <text x="30" y="148" fontFamily="monospace" fontSize="9" fill="#10b981">$ npm run deploy</text>
      <text x="30" y="162" fontFamily="monospace" fontSize="9" fill="#06b6d4">✓ Deployed successfully</text>
      <rect x="30" y="170" width="6" height="10" fill="#7c3aed" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0;0.9" dur="1.1s" repeatCount="indefinite"/>
      </rect>
      <rect x="145" y="200" width="30" height="20" rx="3" fill={isDark?"#1e1b4b":"#ddd6fe"}/>
      <rect x="120" y="218" width="80" height="8"  rx="4" fill={isDark?"#1e1b4b":"#ddd6fe"}/>
    </svg>
  );
}

// ── Laptop SVG ────────────────────────────────────────────────
function LaptopSVG({ isDark }: { isDark: boolean }) {
  const s  = isDark ? "#06b6d4" : "#0891b2";
  const bg = isDark ? "#0f172a" : "#f0fdff";
  const sc = isDark ? "#020617" : "#ecfeff";
  return (
    <svg viewBox="0 0 360 260" className="w-full h-auto" aria-hidden="true">
      <rect x="30" y="10" width="300" height="190" rx="10" fill={bg} stroke={s} strokeWidth="1.5"/>
      <rect x="40" y="20" width="280" height="170" rx="5"  fill={sc}/>
      <text x="50" y="44"  fontFamily="monospace" fontSize="8" fill="#10b981">// Senior Software Engineer</text>
      <text x="50" y="58"  fontFamily="monospace" fontSize="8" fill="#7c3aed">class Damoze extends Engineer &#123;</text>
      <text x="50" y="72"  fontFamily="monospace" fontSize="8" fill="#06b6d4">  skills = ['React','Node','PostgreSQL'];</text>
      <text x="50" y="86"  fontFamily="monospace" fontSize="8" fill="#a78bfa">  location = 'Ethiopia';</text>
      <text x="50" y="100" fontFamily="monospace" fontSize="8" fill="#06b6d4">  async build(idea: string) &#123;</text>
      <text x="50" y="114" fontFamily="monospace" fontSize="8" fill="#10b981">    return await ship(idea);</text>
      <text x="50" y="128" fontFamily="monospace" fontSize="8" fill="#06b6d4">  &#125;</text>
      <text x="50" y="142" fontFamily="monospace" fontSize="8" fill="#7c3aed">&#125;</text>
      <text x="50" y="162" fontFamily="monospace" fontSize="8" fill="#10b981">$ git push origin main</text>
      <text x="50" y="176" fontFamily="monospace" fontSize="8" fill="#06b6d4">✓ Pipeline passed · Deployed</text>
      <rect x="10"  y="200" width="340" height="14" rx="4" fill={isDark?"#1e1b4b":"#cffafe"} stroke={s} strokeWidth="1"/>
      {[0,1,2,3,4,5,6,7,8,9].map(i=>(
        <rect key={i} x={20+i*32} y="204" width="26" height="6" rx="2"
          fill={isDark?"#312e81":"#a5f3fc"} opacity="0.7"/>
      ))}
    </svg>
  );
}

// ── Circuit board SVG ─────────────────────────────────────────
function CircuitSVG({ isDark }: { isDark: boolean }) {
  const lc  = isDark ? "rgba(124,58,237,0.5)"  : "rgba(109,40,217,0.3)";
  const lc2 = isDark ? "rgba(6,182,212,0.35)"  : "rgba(8,145,178,0.2)";
  const ns  = isDark ? "#7c3aed" : "#6d28d9";
  const nf  = isDark ? "#7c3aed" : "#8b5cf6";
  const cb  = isDark ? "#0f172a" : "#f5f3ff";
  const cs  = isDark ? "#06b6d4" : "#0891b2";
  return (
    <svg viewBox="0 0 400 400" className="w-full h-auto" aria-hidden="true">
      {[40,80,120,160,200,240,280,320,360].map((y,i)=>(
        <line key={`h${i}`} x1="0" y1={y} x2="400" y2={y} stroke={lc} strokeWidth="0.6" strokeDasharray="8 4"/>
      ))}
      {[40,80,120,160,200,240,280,320,360].map((x,i)=>(
        <line key={`v${i}`} x1={x} y1="0" x2={x} y2="400" stroke={lc2} strokeWidth="0.6" strokeDasharray="8 4"/>
      ))}
      {[80,160,240,320].flatMap(x=>[80,160,240,320].map(y=>(
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="5" fill={cb} stroke={ns} strokeWidth="1.5" opacity="0.8"/>
          <circle cx={x} cy={y} r="2" fill={nf} opacity="0.9"/>
        </g>
      )))}
      <rect x="155" y="155" width="90" height="90" rx="4" fill={cb} stroke={cs} strokeWidth="1.5" opacity="0.8"/>
      <text x="200" y="196" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={cs} opacity="0.9">CPU</text>
      <text x="200" y="210" textAnchor="middle" fontFamily="monospace" fontSize="6" fill={ns} opacity="0.8">DAMOZE</text>
      {[165,185,205,225].map((x,i)=>(
        <g key={`pt${i}`}>
          <line x1={x} y1="145" x2={x} y2="155" stroke={cs} strokeWidth="1.5" opacity="0.7"/>
          <line x1={x} y1="245" x2={x} y2="255" stroke={cs} strokeWidth="1.5" opacity="0.7"/>
        </g>
      ))}
      {[165,185,205,225].map((y,i)=>(
        <g key={`ps${i}`}>
          <line x1="145" y1={y} x2="155" y2={y} stroke={ns} strokeWidth="1.5" opacity="0.7"/>
          <line x1="245" y1={y} x2="255" y2={y} stroke={ns} strokeWidth="1.5" opacity="0.7"/>
        </g>
      ))}
    </svg>
  );
}

// ── Hexagon grid decoration ───────────────────────────────────
function HexGrid({ isDark }: { isDark: boolean }) {
  const stroke = isDark ? "rgba(124,58,237,0.25)" : "rgba(109,40,217,0.12)";
  const hexPoints = (cx: number, cy: number, r: number) => {
    return Array.from({length:6},(_,i)=>{
      const a = (Math.PI/3)*i - Math.PI/6;
      return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;
    }).join(" ");
  };
  const hexes = [];
  for(let row=0; row<5; row++){
    for(let col=0; col<6; col++){
      const cx = col*70 + (row%2)*35 + 35;
      const cy = row*60 + 30;
      hexes.push({ cx, cy, key:`${row}-${col}` });
    }
  }
  return (
    <svg viewBox="0 0 420 320" className="w-full h-auto" aria-hidden="true">
      {hexes.map(h=>(
        <polygon key={h.key} points={hexPoints(h.cx,h.cy,28)}
          fill="none" stroke={stroke} strokeWidth="1"/>
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

  // Theme colours
  const baseBg      = isDark
    ? "from-[#020617] via-[#050714] to-[#080b1a]"
    : "from-slate-50 via-violet-50/40 to-indigo-50/30";
  const gridC1      = isDark ? "rgba(124,58,237,0.30)" : "rgba(109,40,217,0.08)";
  const gridC2      = isDark ? "rgba(6,182,212,0.10)"  : "rgba(8,145,178,0.05)";
  const binaryClr   = isDark ? "#7c3aed" : "#8b5cf6";
  const codeClrs    = isDark
    ? ["#7c3aed","#06b6d4","#10b981","#a78bfa"]
    : ["#6d28d9","#0891b2","#059669","#7c3aed"];
  const particleClr = isDark ? "rgba(139,92,246,0.8)" : "rgba(109,40,217,0.5)";
  const orb1        = isDark ? "rgba(124,58,237,0.18)" : "rgba(139,92,246,0.08)";
  const orb2        = isDark ? "rgba(6,182,212,0.12)"  : "rgba(6,182,212,0.06)";
  const orb3        = isDark ? "rgba(16,185,129,0.08)" : "rgba(16,185,129,0.04)";
  const scanClr     = isDark
    ? "linear-gradient(90deg,transparent,rgba(124,58,237,0.5),rgba(6,182,212,0.5),transparent)"
    : "linear-gradient(90deg,transparent,rgba(109,40,217,0.2),rgba(8,145,178,0.2),transparent)";
  const overlay     = isDark ? "bg-gray-950/50" : "bg-white/55";
  const svgOp       = isDark ? 0.14 : 0.16;
  const hexOp       = isDark ? 0.18 : 0.10;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }} aria-hidden="true">

      {/* 1 ── Base gradient — full viewport */}
      <div className={`absolute inset-0 bg-gradient-to-br ${baseBg} transition-all duration-700`}/>

      {/* 2 ── Fine circuit grid — full viewport */}
      <div className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: 0.07,
          backgroundImage:`
            linear-gradient(${gridC1} 1px,transparent 1px),
            linear-gradient(90deg,${gridC1} 1px,transparent 1px),
            linear-gradient(${gridC2} 1px,transparent 1px),
            linear-gradient(90deg,${gridC2} 1px,transparent 1px)`,
          backgroundSize:"80px 80px,80px 80px,20px 20px,20px 20px",
        }}/>

      {/* 3 ── Canvas binary rain — starts BELOW navbar (top: 80px) */}
      <div className="absolute left-0 right-0 bottom-0" style={{ top: "80px" }}>
        <MatrixCanvas isDark={isDark}/>
      </div>

      {/* 4 ── HORIZONTAL code lines — underlaying, behind vertical rain */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden"
        style={{ top: "80px", opacity: isDark ? 0.13 : 0.06 }}>
        {H_LINES.map((l, i) => (
          <HorizontalCodeLine key={i} {...l}
            color={isDark
              ? i % 3 === 0 ? "#7c3aed" : i % 3 === 1 ? "#06b6d4" : "#10b981"
              : i % 3 === 0 ? "#6d28d9" : i % 3 === 1 ? "#0891b2" : "#059669"
            }
          />
        ))}
      </div>

      {/* 5 ── Binary rain columns — on top of horizontal lines */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden"
        style={{ top: "80px", opacity: isDark ? 0.35 : 0.12 }}>
        {BINARY_COLS.map((c,i)=>(
          <BinaryColumn key={i} {...c} color={binaryClr}/>
        ))}
      </div>

      {/* 6 ── Floating code lines — on top of everything */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden"
        style={{ top: "80px", opacity: isDark ? 0.22 : 0.09 }}>
        {CODE_LINES.map((l,i)=>(
          <CodeLine key={i} {...l} color={codeClrs[i%4]}/>
        ))}
      </div>

      {/* 7 ── Floating particles */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden"
        style={{ top: "80px" }}>
        {PARTICLES.map((p,i)=>(
          <Particle key={i} {...p} color={particleClr}/>
        ))}
      </div>

      {/* 7 ── Monitor — top left */}
      <motion.div className="absolute"
        style={{top:"6%",left:"1%",width:"clamp(150px,17vw,270px)",opacity:svgOp}}
        animate={{y:[0,-14,0]}}
        transition={{duration:7,repeat:Infinity,ease:"easeInOut"}}>
        <MonitorSVG isDark={isDark}/>
      </motion.div>

      {/* 8 ── Laptop — bottom right */}
      <motion.div className="absolute"
        style={{bottom:"5%",right:"1%",width:"clamp(170px,19vw,310px)",opacity:svgOp}}
        animate={{y:[0,12,0]}}
        transition={{duration:9,repeat:Infinity,ease:"easeInOut",delay:2}}>
        <LaptopSVG isDark={isDark}/>
      </motion.div>

      {/* 9 ── Circuit — top right */}
      <motion.div className="absolute"
        style={{top:"4%",right:"2%",width:"clamp(130px,15vw,250px)",opacity:svgOp*0.85}}
        animate={{rotate:[0,4,0,-4,0]}}
        transition={{duration:22,repeat:Infinity,ease:"easeInOut"}}>
        <CircuitSVG isDark={isDark}/>
      </motion.div>

      {/* 10 ── Circuit — bottom left */}
      <motion.div className="absolute"
        style={{bottom:"4%",left:"2%",width:"clamp(110px,13vw,210px)",opacity:svgOp*0.75}}
        animate={{rotate:[0,-4,0,4,0]}}
        transition={{duration:20,repeat:Infinity,ease:"easeInOut",delay:3}}>
        <CircuitSVG isDark={isDark}/>
      </motion.div>

      {/* 11 ── Hex grid — centre left */}
      <motion.div className="absolute"
        style={{top:"30%",left:"-2%",width:"clamp(200px,22vw,360px)",opacity:hexOp}}
        animate={{y:[0,-10,0]}}
        transition={{duration:14,repeat:Infinity,ease:"easeInOut",delay:1}}>
        <HexGrid isDark={isDark}/>
      </motion.div>

      {/* 12 ── Hex grid — centre right */}
      <motion.div className="absolute"
        style={{top:"40%",right:"-2%",width:"clamp(180px,20vw,320px)",opacity:hexOp}}
        animate={{y:[0,10,0]}}
        transition={{duration:16,repeat:Infinity,ease:"easeInOut",delay:4}}>
        <HexGrid isDark={isDark}/>
      </motion.div>

      {/* 13 ── Glowing orbs */}
      <motion.div className="absolute rounded-full blur-3xl"
        style={{top:"10%",left:"8%",width:550,height:550,
          background:`radial-gradient(circle,${orb1} 0%,transparent 70%)`}}
        animate={{scale:[1,1.35,1],opacity:[0.7,1,0.7]}}
        transition={{duration:11,repeat:Infinity,ease:"easeInOut"}}/>
      <motion.div className="absolute rounded-full blur-3xl"
        style={{bottom:"8%",right:"8%",width:650,height:650,
          background:`radial-gradient(circle,${orb2} 0%,transparent 70%)`}}
        animate={{scale:[1.2,1,1.2],opacity:[0.5,0.9,0.5]}}
        transition={{duration:13,repeat:Infinity,ease:"easeInOut",delay:3}}/>
      <motion.div className="absolute rounded-full blur-3xl"
        style={{top:"50%",left:"45%",width:700,height:700,
          transform:"translate(-50%,-50%)",
          background:`radial-gradient(circle,${orb3} 0%,transparent 70%)`}}
        animate={{scale:[1,1.2,1]}}
        transition={{duration:17,repeat:Infinity,ease:"easeInOut",delay:6}}/>

      {/* 14 ── Scanline sweep */}
      <motion.div className="absolute left-0 right-0 h-[2px]"
        style={{background:scanClr}}
        initial={{top:"0%"}}
        animate={{top:"100%"}}
        transition={{duration:9,repeat:Infinity,ease:"linear",repeatDelay:5}}/>

      {/* 15 ── Final overlay — keeps text readable */}
      <div className={`absolute inset-0 transition-all duration-700 ${overlay}`}/>

      {/* 16 ── Navbar fade — smooth transition from navbar into content */}
      <div className="absolute left-0 right-0 h-16 pointer-events-none"
        style={{
          top: "80px",
          background: isDark
            ? "linear-gradient(to bottom, rgba(2,6,23,0.6) 0%, transparent 100%)"
            : "linear-gradient(to bottom, rgba(245,243,255,0.5) 0%, transparent 100%)",
        }}/>
    </div>
  );
}
