"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Trophy, Users } from "lucide-react";
import { experience } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const typeConfig: Record<string, { icon: typeof Briefcase; color: string; bg: string }> = {
  Education: { icon: GraduationCap, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-900/30" },
  Projects:  { icon: Briefcase,     color: "text-blue-600 dark:text-blue-400",     bg: "bg-blue-100 dark:bg-blue-900/30" },
  Freelance: { icon: Users,         color: "text-blue-600 dark:text-blue-400",     bg: "bg-blue-100 dark:bg-blue-900/30" },
  Leadership:{ icon: GraduationCap, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  Achievement:{ icon: Trophy,       color: "text-amber-600 dark:text-amber-400",   bg: "bg-amber-100 dark:bg-amber-900/30" },
  Internship:{ icon: Briefcase,     color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-900/30" },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="My Journey"
          title="Experience and Projects"
          subtitle="How I've grown as a software engineer through study, projects, and continuous practice."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-indigo-500 to-transparent" />

              <div className="space-y-8">
                {experience.map((item, index) => {
                  const config = typeConfig[item.type] || typeConfig.Internship;
                  const Icon = config.icon;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative pl-16"
                    >
                      {/* Icon dot */}
                      <div className={`absolute left-0 w-12 h-12 rounded-2xl ${config.bg} flex items-center justify-center border-4 border-gray-50 dark:border-gray-900`}>
                        <Icon size={20} className={config.color} />
                      </div>

                      {/* Card */}
                      <div className="glass-card rounded-2xl p-6 border border-violet-900/30 hover:border-violet-400 dark:hover:border-violet-600 transition-colors shadow-sm hover:shadow-md">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.role}</h3>
                            <p className="text-violet-600 dark:text-violet-400 font-semibold">{item.company}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-600 dark:text-gray-400">{item.period}</span>
                            <div className={`mt-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}>
                              {item.type}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Achievements */}
                        <ul className="space-y-1.5 mb-4">
                          {item.achievements.map((achievement) => (
                            <li key={achievement} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Developer Stats */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Trophy size={20} className="text-violet-600" />
                Developer Activity
              </h3>

              {/* GitHub activity card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-5 rounded-2xl glass-card border border-violet-900/30 hover:border-violet-400 dark:hover:border-violet-600 transition-colors mb-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">GitHub Activity</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">github.com/anchoredinlord</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">200+</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">total commits</span>
                </div>
              </motion.div>

              {/* Focus areas */}
              <div className="space-y-3 mb-6">
                {[
                  { label: "Full-Stack Development", desc: "React, Next.js, Python backends" },
                  { label: "Backend and APIs",          desc: "FastAPI, REST API design, PostgreSQL" },
                  { label: "AI Integration",          desc: "Ollama, local AI models, Python" },
                  { label: "Database Systems",        desc: "Schema design, query optimization" },
                ].map(({ label, desc }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="p-3.5 rounded-xl glass-card border border-violet-900/30 hover:border-violet-400 dark:hover:border-violet-600 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white"
              >
                <h4 className="font-bold mb-4">By the Numbers</h4>
                <div className="space-y-3">
                  {[
                    { label: "Projects Completed",      value: "5" },
                    { label: "GitHub Commits",           value: "200+" },
                    { label: "Full-Stack Projects",      value: "3" },
                    { label: "AI Integration Projects",  value: "1+" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center">
                      <span className="text-violet-200 text-sm">{label}</span>
                      <span className="font-bold text-lg">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
