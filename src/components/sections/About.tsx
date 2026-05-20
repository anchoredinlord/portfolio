"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, GraduationCap, Briefcase, Heart, Zap } from "lucide-react";
import { personalInfo, education, stats, assets } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ProfileImage from "@/components/ui/ProfileImage";

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center p-4 rounded-2xl bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800/30"
    >
      <div className="text-3xl font-extrabold bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
        {value}{suffix}
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300 mt-1 font-medium">{label}</div>
    </motion.div>
  );
}

const highlights = [
  { icon: MapPin,        label: "Location",  value: personalInfo.location },
  { icon: Mail,          label: "Email",     value: personalInfo.email },
  { icon: GraduationCap, label: "Education", value: education[0].degree },
  { icon: Briefcase,     label: "Status",    value: "Open to Opportunities" },
];

const passions = [
  { icon: Zap,           text: "Building scalable web applications" },
  { icon: Heart,         text: "Reading 2–3 pages per day" },
  { icon: GraduationCap, text: "Coding 2–3 hours per day" },
  { icon: Briefcase,     text: "Open source contribution" },
];

export default function About() {
  return (
    <section id="about" className="py-24 section-layer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About Me"
          title="Who I Am"
          subtitle="A passionate engineer who loves building things that matter."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left — original card layout ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main gradient card */}
            <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-violet-600 to-indigo-700 text-white shadow-2xl shadow-violet-500/20">
              {/* ── Full-width about photo at the top ── */}
              <div className="relative w-full h-56 overflow-hidden">
                <ProfileImage
                  src={assets.aboutPhoto}
                  alt={`${personalInfo.name} — About`}
                  size={600}
                  className="w-full h-full object-cover object-top"
                />
                {/* gradient fade into the card below */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-indigo-700 to-transparent" />
              </div>

              {/* ── Card content below photo ── */}
              <div className="relative p-8">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-1">{personalInfo.name}</h3>
                  <p className="text-violet-200 mb-6">{personalInfo.title}</p>

                  <div className="space-y-3">
                    {highlights.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                          <Icon size={14} />
                        </div>
                        <div>
                          <div className="text-xs text-violet-300">{label}</div>
                          <div className="text-sm font-medium truncate max-w-[200px]">{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </motion.div>

          {/* ── Right — text content ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              {personalInfo.about.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Education */}
            <div className="mt-8 p-6 rounded-2xl glass-card-light border border-violet-900/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <GraduationCap size={20} className="text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{education[0].degree}</div>
                  <div className="text-sm text-gray-500">{education[0].school} · {education[0].period}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {education[0].achievements.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-medium"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Passions */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                What I&apos;m passionate about
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {passions.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Icon size={14} className="text-violet-500 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                variant="primary"
              >
                Get In Touch
              </Button>
              <Button href={assets.resume} variant="outline">
                Download CV
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
