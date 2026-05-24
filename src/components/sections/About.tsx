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
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-center p-4 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700/60 shadow-sm"
    >
      <div className="text-3xl font-extrabold bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
        {value}{suffix}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium uppercase tracking-wide">
        {label}
      </div>
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
  { icon: Heart,         text: "3–4 hours reading per day" },
  { icon: GraduationCap, text: "3–4 hours coding per day" },
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

          {/* ── Left — Profile card ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-violet-600 to-indigo-700 text-white shadow-2xl shadow-violet-500/25">

              {/* Full-width photo */}
              <div className="relative w-full h-56 overflow-hidden">
                <ProfileImage
                  src={assets.aboutPhoto}
                  alt={`${personalInfo.name} — About`}
                  size={600}
                  className="w-full h-full object-cover object-top"
                />
                {/* Fade into card body */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-indigo-700 to-transparent" />
              </div>

              {/* Card body */}
              <div className="relative p-8">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-0.5">{personalInfo.name}</h3>
                  <p className="text-violet-200 text-sm mb-6">{personalInfo.title}</p>

                  <div className="space-y-3">
                    {highlights.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                          <Icon size={14} />
                        </div>
                        <div>
                          <div className="text-xs text-violet-300 uppercase tracking-wide">{label}</div>
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

          {/* ── Right — Text content ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Bio paragraphs */}
            <div className="space-y-5">
              {personalInfo.about.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Education */}
            <div className="mt-8 p-6 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700/60 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
                  <GraduationCap size={19} className="text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {education[0].degree}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {education[0].school} · {education[0].period}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {education[0].achievements.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-medium border border-violet-100 dark:border-violet-800/40"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Passions */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-widest mb-4">
                What I&apos;m passionate about
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {passions.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/50 text-sm text-gray-700 dark:text-gray-300 shadow-sm"
                  >
                    <div className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
                      <Icon size={13} className="text-violet-600 dark:text-violet-400" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
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
