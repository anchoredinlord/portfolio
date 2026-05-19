"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Trophy, Users, Award, ExternalLink } from "lucide-react";
import { experience, certifications } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const typeConfig: Record<string, { icon: typeof Briefcase; color: string; bg: string }> = {
  Internship: { icon: Briefcase, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-900/30" },
  Freelance: { icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
  Leadership: { icon: GraduationCap, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  Achievement: { icon: Trophy, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="My Journey"
          title="Experience and Achievements"
          subtitle="The milestones that have shaped my engineering career."
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

          {/* Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Award size={20} className="text-violet-600" />
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-2xl glass-card border border-violet-900/30 hover:border-violet-400 dark:hover:border-violet-600 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-3">
                          <Award size={16} className="text-violet-600 dark:text-violet-400" />
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight mb-1">
                          {cert.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                        <p className="text-xs text-violet-600 dark:text-violet-400 font-medium mt-1">{cert.date}</p>
                      </div>
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="View credential"
                      >
                        <ExternalLink size={14} />
                      </a>
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
                className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white"
              >
                <h4 className="font-bold mb-4">Quick Stats</h4>
                <div className="space-y-3">
                  {[
                    { label: "Years of Experience", value: "2+" },
                    { label: "Projects Delivered", value: "25+" },
                    { label: "Certifications", value: "4" },
                    { label: "Hackathons Won", value: "1" },
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
