"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const categoryConfig = {
  frontend: { label: "Frontend", color: "from-violet-500 to-purple-500", bg: "bg-violet-50 dark:bg-violet-900/20", border: "border-violet-200 dark:border-violet-800/30" },
  backend: { label: "Backend", color: "from-blue-500 to-cyan-500", bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-800/30" },
  database: { label: "Database", color: "from-emerald-500 to-teal-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-emerald-200 dark:border-emerald-800/30" },
  tools: { label: "Tools & DevOps", color: "from-orange-500 to-amber-500", bg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-800/30" },
};

function SkillBar({ name, level, color, index }: { name: string; level: number; color: string; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{level}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function SkillCard({ name, level, color }: { name: string; level: number; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className="relative p-4 rounded-2xl glass-card border border-violet-900/30 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{name}</span>
        <span className={`text-xs font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Technical Skills"
          title="My Tech Stack"
          subtitle="Technologies I work with to build modern, scalable applications."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(Object.entries(skills) as [keyof typeof skills, typeof skills.frontend][]).map(
            ([category, skillList], catIndex) => {
              const config = categoryConfig[category];
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                  className={`p-6 rounded-3xl ${config.bg} border ${config.border}`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${config.color}`} />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{config.label}</h3>
                  </div>
                  <div className="space-y-4">
                    {skillList.map((skill, i) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={config.color}
                        index={i}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

        {/* Tech logos grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-8 font-medium uppercase tracking-widest">
            Technologies I work with
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "React", "Next.js", "TypeScript", "Node.js", "Express",
              "PostgreSQL", "MongoDB", "MySQL", "Redis", "Docker",
              "Git", "AWS", "Tailwind CSS", "GraphQL", "Prisma",
              "Figma", "Postman", "Linux", "Python", "REST APIs"
            ].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 rounded-xl glass-card border border-violet-900/30 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
