"use client";

import { useEffect, useRef } from "react";

// Floating code snippets that drift across the screen
const CODE_SNIPPETS = [
  "const app = express();",
  "SELECT * FROM users;",
  "npm run build",
  "git commit -m 'feat'",
  "useState<T>(null)",
  "async/await fetch()",
  "docker-compose up",
  "interface Props {}",
  "useEffect(() => {}, [])",
  "pg.connect(DB_URL)",
  "export default function",
  "tailwind.config.js",
  "next.config.ts",
  "prisma migrate dev",
  "res.json({ ok: true })",
  "import React from 'react'",
  "npm install --save",
  "git push origin main",
  "const [data, setData]",
  "router.get('/api', ...)",
];

export default function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    // ── Resize handler ──────────────────────────────────────────
    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Matrix rain columns ──────────────────────────────────────
    const FONT_SIZE = 13;
    const CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]()<>/\\|=+-*&^%$#@!";

    let columns: number[] = [];
    const initColumns = () => {
      columns = Array.from(
        { length: Math.floor(width / FONT_SIZE) },
        () => Math.random() * -100
      );
    };
    initColumns();

    // ── Floating code particles ──────────────────────────────────
    interface CodeParticle {
      x: number;
      y: number;
      text: string;
      speed: number;
      opacity: number;
      size: number;
      color: string;
    }

    const COLORS = ["#06b6d4", "#8b5cf6", "#10b981", "#3b82f6", "#a78bfa"];

    const makeParticle = (): CodeParticle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      speed: 0.2 + Math.random() * 0.5,
      opacity: 0.08 + Math.random() * 0.18,
      size: 10 + Math.random() * 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    let particles: CodeParticle[] = Array.from({ length: 28 }, makeParticle);

    // ── Circuit nodes ────────────────────────────────────────────
    interface Node {
      x: number;
      y: number;
      pulse: number;
      pulseSpeed: number;
      connections: number[];
    }

    const makeNodes = (): Node[] => {
      const count = Math.min(30, Math.floor((width * height) / 28000));
      const nodes: Node[] = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        connections: [],
      }));
      // Connect nearby nodes
      nodes.forEach((n, i) => {
        nodes.forEach((m, j) => {
          if (i !== j) {
            const d = Math.hypot(n.x - m.x, n.y - m.y);
            if (d < 180) n.connections.push(j);
          }
        });
      });
      return nodes;
    };

    let nodes = makeNodes();

    window.addEventListener("resize", () => {
      initColumns();
      nodes = makeNodes();
      particles = Array.from({ length: 28 }, makeParticle);
    });

    // ── Draw loop ────────────────────────────────────────────────
    let frame = 0;

    const draw = () => {
      frame++;

      // Dark semi-transparent overlay for trail effect
      ctx.fillStyle = "rgba(3, 7, 18, 0.18)";
      ctx.fillRect(0, 0, width, height);

      // ── Matrix rain ──
      ctx.font = `${FONT_SIZE}px monospace`;
      columns.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;

        // Bright head character
        ctx.fillStyle = "rgba(139, 92, 246, 0.9)";
        ctx.fillText(char, x, y * FONT_SIZE);

        // Trail
        ctx.fillStyle = "rgba(6, 182, 212, 0.15)";
        ctx.fillText(char, x, (y - 1) * FONT_SIZE);

        // Reset column randomly
        if (y * FONT_SIZE > height && Math.random() > 0.975) {
          columns[i] = 0;
        }
        columns[i] += 0.5;
      });

      // ── Circuit lines ──
      nodes.forEach((node) => {
        node.pulse += node.pulseSpeed;
        const glow = 0.3 + 0.2 * Math.sin(node.pulse);

        node.connections.forEach((j) => {
          const target = nodes[j];
          const grad = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
          grad.addColorStop(0, `rgba(139, 92, 246, ${glow * 0.4})`);
          grad.addColorStop(0.5, `rgba(6, 182, 212, ${glow * 0.6})`);
          grad.addColorStop(1, `rgba(139, 92, 246, ${glow * 0.4})`);

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        });

        // Node dot
        const r = 2 + 1.5 * Math.sin(node.pulse);
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${0.5 + 0.4 * Math.sin(node.pulse)})`;
        ctx.fill();

        // Outer glow ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * Math.sin(node.pulse + 1)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // ── Floating code snippets ──
      ctx.textAlign = "left";
      particles.forEach((p) => {
        ctx.font = `${p.size}px 'Courier New', monospace`;
        ctx.fillStyle = p.color.replace(")", `, ${p.opacity})`).replace("rgb", "rgba");
        // Manually set opacity via globalAlpha
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillText(p.text, p.x, p.y);
        ctx.globalAlpha = 1;

        p.y -= p.speed;
        p.x += Math.sin(frame * 0.005 + p.y * 0.01) * 0.3;

        // Reset when off screen
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
          p.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
        }
      });

      // ── Scanline effect ──
      if (frame % 3 === 0) {
        const scanY = (frame * 2) % height;
        const scanGrad = ctx.createLinearGradient(0, scanY - 4, 0, scanY + 4);
        scanGrad.addColorStop(0, "rgba(6, 182, 212, 0)");
        scanGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.04)");
        scanGrad.addColorStop(1, "rgba(6, 182, 212, 0)");
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, scanY - 4, width, 8);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}
