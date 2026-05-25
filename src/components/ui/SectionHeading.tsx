"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-16", centered && "text-center", className)}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          {badge}
        </motion.div>
      )}

      {/* Slide-in wrapper — runs once on enter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Breathe loop — runs forever after entry */}
        <motion.h2
          animate={{ opacity: [1, 0.55, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="heading-gradient text-3xl md:text-4xl lg:text-5xl font-bold"
        >
          {title}
        </motion.h2>
      </motion.div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={cn(
          "mt-6 h-1 w-20 bg-linear-to-r from-violet-600 to-indigo-600 rounded-full",
          centered && "mx-auto"
        )}
      />
    </div>
  );
}
