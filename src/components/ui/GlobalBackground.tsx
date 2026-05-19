"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useEffect, useState, useRef } from "react";

// ── Reduced data sets for performance ────────────────────────

// Only 6 vertical code lines (was 14)
const CODE_LINES = [
  { text: "const dev = new Engineer('Damoze');",        x: "3%",  delay: 0,  dur: 24 },
  { text: "SELECT * FROM projects WHERE active=true;",  x: "22%", delay: 5,  dur: 28 },
  { text: "git push origin main && vercel deploy",      x: "42%", delay: 10, dur: 22 },
  { text: "interface Engineer { skills: string[] }",    x: "60%", delay: 3,  dur: 26 },
  { text: "useEffect(() => { fetchData(); }, []);",     x: "78%", delay: 8,  dur: 24 },
  { text: "res.status(200).json({ success: true });",   x: "90%", delay: 14, dur: 20 },
];

// Only 8 binary columns (was 16)
const BINARY_COLS = [
  { x:"5%",  delay:0,   dur:16 }, { x:"18%", delay:6,   dur:19 },
  { x:"32%", delay:12,  dur:15 }, { x:"46%", delay:3,   dur:18 },
  { x:"60%", delay:9,   dur:16 }, { x:"72%", delay:15,  dur:20 },
  { x:"84%", delay:4,   dur:17 }, { x:"94%", delay:7,   dur:15 },
];

// Only 4 horizontal lines (was 10)
const H_LINES = [
  { text: "01000100 01100001 01101101 01101111 01111010 01100101  →  Damoze Motuma — Senior Software Engineer — Ethiopia", y:"20%", dir: 1,  dur:40, delay:0  },
  { text: "npm run build  ←  git push origin main  ←  vercel deploy --prod  ←  docker-compose up", y:"40%", dir:-1, dur:45, delay:5  },
  { text: "const portfolio = new Engineer('Damoze').build()  →  SELECT * FROM projects ORDER BY stars DESC", y:"62%", dir: 1,  dur:42, delay:10 },
  { text: "useEffect(() => { fetchProjects(); }, [])  ←  prisma migrate dev  ←  anchoredinlord", y:"82%", dir:-1, dur:38, delay:3  },
];

// Fixed bits — no Math.random
const BITS = [1,0,1,0,1,1,0,1,0,0,1,0,1,1,0,1,0,0];

// ── Canvas binary rain — optimised (lower FPS) ───────────────
function MatrixCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastTime = 0;
    const FPS = 20; // Reduced from 60fps to 20fps — 3x less CPU
    const interval = 1000 / FPS;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const FONT_SIZE = 14;
    let cols: { y: number; speed: number }[] = [];
    const initCols = () => {
      const count = Math.floor(canvas.width / (FONT_SIZE * 2)); // Every 2nd column — half as many
      cols = Array.from({ length: count }, (_, i) => ({
        y:     (i % 7) * -20,
        speed: 0.3 + (i % 5) * 0.12,
      }));
    };
    initCols();
    window.addEventListener("resize", initCols);

    let frame = 0;
    const tick = (timestamp: number) => {
      animId = requestAnimationFrame(tick);
      if (timestamp - lastTime < interval) return; // Skip frames
      lastTime = timestamp;
      frame++;

      ctx.fillStyle = isDark ? "rgba(2,6,23,0.12)" : "rgba(245,243,255,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `bold ${FONT_SIZE}px 'Courier New', monospace`;

      cols.forEach((col, i) => {
        const x   = i * FONT_SIZE * 2;
        const yPx = col.y * FONT_SIZE;
        const bit = (i + frame + Math.floor(col.y)) % 2 === 0 ? "1" : "0";

        ctx.shadowBlur  = isDark ? 6 : 3;
        ctx.shadowColor = "#7c3aed";
        ctx.fillStyle   = isDark ? "rgba(255,255,255,0.85)" : "rgba(109,40,217,0.75)";
        ctx.fillText(bit, x, yPx);

        ctx.shadowBlur  = 0;
        ctx.fillStyle   = isDark ? "rgba(139,92,246,0.35)" : "rgba(109,40,217,0.18)";
        ctx.fillText((i + frame + Math.floor(col.y) + 1) % 2 === 0 ? "1" : "0", x, yPx - FONT_SIZE);

        col.y += col.speed;
        if (yPx > canvas.height + FONT_SIZE * 2) {
          col.y = -Math.floor(Math.abs(Math.sin(i)) * 15);
        }
      });
    };
    animId = requestAnimationFrame(tick);

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
      style={{ opacity: isDark ? 0.6 : 0.08 }}
      aria-hidden="true"
    />
  );
}

// ── Binary column ─────────────────────────────────────────────
function BinaryColumn({ x, delay, dur, color }: {
  x: string; delay: number; dur: number; color: string;
}) {
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
          style={{ color, opacity: Math.max(0.04, 0.65 - i * 0.035) }}>
          {b}
        </span>
      ))}
    </motion.div>
  );
}

// ── Vertical code line ────────────────────────────────────────
function CodeLine({ text, x, delay, dur, color }: {
  text: string; x: string; delay: number; dur: number; color: string;
}) {
  return (
    <motion.div
      className="absolute font-mono text-[11px] whitespace-nowrap select-none pointer-events-none"
      style={{ left: x, bottom: "-1.5rem", color }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: "-110vh", opacity: [0, 0.65, 0.65, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
    >
      {text}
    </motion.div>
  );
}

// ── Horizontal code line ──────────────────────────────────────
function HLine({ text, y, dir, dur, delay, color }: {
  text: string; y: string; dir: number; dur: number; delay: number; color: string;
}) {
  return (
    <motion.div
      className="absolute whitespace-nowrap font-mono text-[10px] select-none pointer-events-none"
      style={{ top: y, color, letterSpacing: "0.04em" }}
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
  const s = isDark ? "#7c3aed" : "#6d28d9";
  const bg = isDark ? "#0f172a" : "#f5f3ff";
  const sc = isDark ? "#020617" : "#ede9fe";
  return (
    <svg viewBox="0 0 320 240" className="w-full h-auto" aria-hidden="true">
      <rect x="10" y="10" width="300" height="190" rx="12" fill={bg} stroke={s} strokeWidth="2"/>
      <rect x="20" y="20" width="280" height="165" rx="6" fill={sc}/>
      <text x="30" y="44"  fontFamily="monospace" fontSize="9" fill="#7c3aed">const App = () =&gt; &#123;</text>
      <text x="30" y="58"  fontFamily="monospace" fontSize="9" fill="#06b6d4">  const [data, setData] = useState([]);</text>
      <text x="30" y="72"  fontFamily="monospace" fontSize="9" fill="#10b981">  useEffect(() =&gt; &#123; fetchData(); &#125;, []);</text>
      <text x="30" y="86"  fontFamily="monospace" fontSize="9" fill="#a78bfa">  return &lt;Dashboard data=&#123;data&#125; /&gt;;</text>
      <text x="30" y="100" fontFamily="monospace" fontSize="9" fill="#7c3aed">&#125;;</text>
      <text x="30" y="120" fontFamily="monospace" fontSize="9" fill="#10b981">$ npm run deploy</text>
      <text x="30" y="134" fontFamily="monospace" fontSize="9" fill="#06b6d4">✓ Deployed successfully</text>
      <rect x="30" y="145" width="6" height="10" fill="#7c3aed" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0;0.9" dur="1.2s" repeatCount="indefinite"/>
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
      <rect x="40" y="20" width="280" height="170" rx="5" fill={sc}/>
      <text x="50" y="44"  fontFamily="monospace" fontSize="8" fill="#10b981">// Senior Software Engineer</text>
      <text x="50" y="58"  fontFamily="monospace" fontSize="8" fill="#7c3aed">class Damoze extends Engineer &#123;</text>
      <text x="50" y="72"  fontFamily="monospace" fontSize="8" fill="#06b6d4">  skills = ['React','Node','PostgreSQL'];</text>
      <text x="50" y="86"  fontFamily="monospace" fontSize="8" fill="#a78bfa">  location = 'Ethiopia';</text>
      <text x="50" y="100" fontFamily="monospace" fontSize="8" fill="#10b981">  async build(idea: string) &#123;</text>
      <text x="50" y="114" fontFamily="monospace" fontSize="8" fill="#06b6d4">    return await ship(idea);</text>
      <text x="50" y="128" fontFamily="monospace" fontSize="8" fill="#7c3aed">  &#125;</text>
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

// ── Main GlobalBackground ─────────────────────────────────────
export default function GlobalBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme !== "light";

  const baseBg     = isDark
    ? "from-[#020617] via-[#050714] to-[#080b1a]"
    : "from-white via-violet-50/20 to-indigo-50/10";
  const gridC1     = isDark ? "rgba(124,58,237,0.25)" : "rgba(109,40,217,0.05)";
  const gridC2     = isDark ? "rgba(6,182,212,0.08)"  : "rgba(8,145,178,0.03)";
  const binaryClr  = isDark ? "#7c3aed" : "#8b5cf6";
  const codeClrs   = isDark
    ? ["#7c3aed","#06b6d4","#10b981","#a78bfa"]
    : ["#6d28d9","#0891b2","#059669","#7c3aed"];
  const hClrs      = isDark
    ? ["#7c3aed","#06b6d4","#10b981","#a78bfa"]
    : ["#6d28d9","#0891b2","#059669","#7c3aed"];
  const orb1       = isDark ? "rgba(124,58,237,0.14)" : "rgba(139,92,246,0.04)";
  const orb2       = isDark ? "rgba(6,182,212,0.09)"  : "rgba(6,182,212,0.03)";
  const scanClr    = isDark
    ? "linear-gradient(90deg,transparent,rgba(124,58,237,0.4),rgba(6,182,212,0.4),transparent)"
    : "linear-gradient(90deg,transparent,rgba(109,40,217,0.08),rgba(8,145,178,0.08),transparent)";
  const overlay    = isDark ? "bg-gray-950/55" : "bg-white/82";
  const svgOp      = isDark ? 0.13 : 0.07;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }} aria-hidden="true">

      {/* 1 — Base gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${baseBg} transition-all duration-700`}/>

      {/* 2 — Circuit grid */}
      <div className="absolute inset-0" style={{
        opacity: 0.06,
        backgroundImage:`
          linear-gradient(${gridC1} 1px,transparent 1px),
          linear-gradient(90deg,${gridC1} 1px,transparent 1px),
          linear-gradient(${gridC2} 1px,transparent 1px),
          linear-gradient(90deg,${gridC2} 1px,transparent 1px)`,
        backgroundSize:"80px 80px,80px 80px,20px 20px,20px 20px",
      }}/>

      {/* 3 — Canvas binary rain (below navbar, 20fps) */}
      <div className="absolute left-0 right-0 bottom-0" style={{ top:"80px" }}>
        <MatrixCanvas isDark={isDark}/>
      </div>

      {/* 4 — Horizontal lines (underlayer) */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden"
        style={{ top:"80px", opacity: isDark ? 0.11 : 0.03 }}>
        {H_LINES.map((l,i) => (
          <HLine key={i} {...l} color={hClrs[i % 4]}/>
        ))}
      </div>

      {/* 5 — Binary columns */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden"
        style={{ top:"80px", opacity: isDark ? 0.30 : 0.06 }}>
        {BINARY_COLS.map((c,i) => (
          <BinaryColumn key={i} {...c} color={binaryClr}/>
        ))}
      </div>

      {/* 6 — Vertical code lines */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden"
        style={{ top:"80px", opacity: isDark ? 0.18 : 0.05 }}>
        {CODE_LINES.map((l,i) => (
          <CodeLine key={i} {...l} color={codeClrs[i % 4]}/>
        ))}
      </div>

      {/* 7 — Monitor SVG top-left */}
      <motion.div className="absolute"
        style={{ top:"8%", left:"1%", width:"clamp(130px,14vw,240px)", opacity:svgOp }}
        animate={{ y:[0,-12,0] }}
        transition={{ duration:8, repeat:Infinity, ease:"easeInOut" }}>
        <MonitorSVG isDark={isDark}/>
      </motion.div>

      {/* 8 — Laptop SVG bottom-right */}
      <motion.div className="absolute"
        style={{ bottom:"5%", right:"1%", width:"clamp(150px,16vw,280px)", opacity:svgOp }}
        animate={{ y:[0,10,0] }}
        transition={{ duration:10, repeat:Infinity, ease:"easeInOut", delay:2 }}>
        <LaptopSVG isDark={isDark}/>
      </motion.div>

      {/* 9 — Two glowing orbs (reduced from 3) */}
      <motion.div className="absolute rounded-full blur-3xl"
        style={{ top:"15%", left:"8%", width:450, height:450,
          background:`radial-gradient(circle,${orb1} 0%,transparent 70%)` }}
        animate={{ scale:[1,1.25,1], opacity:[0.6,1,0.6] }}
        transition={{ duration:12, repeat:Infinity, ease:"easeInOut" }}/>
      <motion.div className="absolute rounded-full blur-3xl"
        style={{ bottom:"10%", right:"8%", width:500, height:500,
          background:`radial-gradient(circle,${orb2} 0%,transparent 70%)` }}
        animate={{ scale:[1.2,1,1.2], opacity:[0.5,0.9,0.5] }}
        transition={{ duration:14, repeat:Infinity, ease:"easeInOut", delay:4 }}/>

      {/* 10 — Scanline (slower) */}
      <motion.div className="absolute left-0 right-0 h-[2px]"
        style={{ background:scanClr }}
        initial={{ top:"0%" }}
        animate={{ top:"100%" }}
        transition={{ duration:12, repeat:Infinity, ease:"linear", repeatDelay:8 }}/>

      {/* 11 — Final overlay */}
      <div className={`absolute inset-0 transition-all duration-700 ${overlay}`}/>

      {/* 12 — Navbar fade bridge */}
      <div className="absolute left-0 right-0 h-16 pointer-events-none"
        style={{
          top:"80px",
          background: isDark
            ? "linear-gradient(to bottom,rgba(2,6,23,0.5) 0%,transparent 100%)"
            : "linear-gradient(to bottom,rgba(245,243,255,0.4) 0%,transparent 100%)",
        }}/>
    </div>
  );
}
