"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Download, Sparkles, Code2, Database } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { personalInfo } from "@/lib/data";
import Button from "@/components/ui/Button";

export default function Hero() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Stronger violet tint just for hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(109,40,217,0.18)_0%,_transparent_60%)] z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(6,182,212,0.10)_0%,_transparent_60%)] z-[1] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left — Text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-900/40 border border-violet-700/50 text-violet-300 text-sm font-medium mb-6"
            >
              <Sparkles size={14} className="text-violet-400" />
              Available for opportunities
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-violet-600 dark:text-violet-400 font-mono text-lg mb-2"
            >
              Hi there, I&apos;m 👋
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight"
            >
              {personalInfo.firstName}{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {personalInfo.lastName}
              </span>
            </motion.h1>

            {/* Animated role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium mb-6 h-8"
            >
              <TypeAnimation
                sequence={personalInfo.roles.flatMap((role) => [role, 2000])}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-violet-300"
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-gray-700 dark:text-gray-400 text-lg leading-relaxed max-w-xl mb-8 mx-auto lg:mx-0"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <Button
                onClick={() => handleScroll("contact")}
                variant="primary"
                size="lg"
              >
                <Sparkles size={18} />
                Hire Me
              </Button>
              <Button
                onClick={() => handleScroll("projects")}
                variant="outline"
                size="lg"
                className="border-violet-500 text-violet-300 hover:bg-violet-600 hover:text-white"
              >
                <Code2 size={18} />
                View Projects
              </Button>
              <Button
                href={personalInfo.resumeUrl}
                variant="ghost"
                size="lg"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <Download size={18} />
                Resume
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <span className="text-gray-500 dark:text-gray-500 text-sm">Find me on</span>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: personalInfo.github, label: "GitHub" },
                  { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2.5 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Avatar / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Outer ring */}
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 opacity-20 blur-xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              {/* Ring border */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1 bg-gradient-to-br from-violet-500 to-indigo-500">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                  {/* Avatar placeholder — replace with actual image */}
                  <div className="w-full h-full bg-gradient-to-br from-violet-900 to-indigo-900 flex items-center justify-center">
                    <span className="text-7xl md:text-8xl font-bold text-white/20 select-none">
                      {personalInfo.firstName[0]}{personalInfo.lastName[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gray-900 border border-gray-700 rounded-2xl px-3 py-2 flex items-center gap-2 shadow-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Code2 size={16} className="text-violet-400" />
                <span className="text-white text-xs font-semibold">Full-Stack Dev</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-gray-900 border border-gray-700 rounded-2xl px-3 py-2 flex items-center gap-2 shadow-xl"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Database size={16} className="text-indigo-400" />
                <span className="text-white text-xs font-semibold">DB Engineer</span>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-12 bg-green-900/80 border border-green-700 rounded-2xl px-3 py-2 shadow-xl"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-300 text-xs font-semibold">Open to work</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-gray-500 dark:text-gray-600 text-xs font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={16} className="text-gray-500 dark:text-gray-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
