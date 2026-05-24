"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail, Phone, MapPin, Github, Linkedin, Twitter, Send,
  CheckCircle, AlertCircle, Loader2
} from "lucide-react";
import { personalInfo } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: Mail,    label: "Email",    value: personalInfo.email,    href: `mailto:${personalInfo.email}` },
  { icon: Phone,   label: "Phone",    value: personalInfo.phone,    href: `tel:${personalInfo.phone}` },
  { icon: MapPin,  label: "Location", value: personalInfo.location, href: "#" },
];

const socialLinks = [
  { icon: Github,   href: personalInfo.github,   label: "GitHub",    color: "hover:text-white hover:bg-gray-800 dark:hover:bg-gray-700" },
  { icon: Linkedin, href: personalInfo.linkedin,  label: "LinkedIn",  color: "hover:text-white hover:bg-blue-600" },
  { icon: Twitter,  href: personalInfo.twitter,   label: "Twitter/X", color: "hover:text-white hover:bg-sky-500" },
  { icon: Send,     href: personalInfo.telegram,  label: "Telegram",  color: "hover:text-white hover:bg-blue-500" },
];

const inputBase =
  "w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 section-layer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get In Touch"
          title="Let's Work Together"
          subtitle="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* ── Left — Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Ready to build something great?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                Whether you&apos;re looking for a full-stack developer, need help with a project,
                or just want to connect — my inbox is always open.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700/60 hover:border-violet-400 dark:hover:border-violet-500 transition-all duration-200 group shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center group-hover:bg-violet-600 transition-colors duration-200 shrink-0">
                    <Icon size={17} className="text-violet-600 dark:text-violet-400 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">{label}</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
                Connect with me
              </p>
              <div className="flex gap-2.5">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(
                      "p-3 rounded-xl bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700/60 text-gray-500 dark:text-gray-400 transition-all duration-200 shadow-sm",
                      color
                    )}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Icon size={17} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="p-5 rounded-2xl bg-linear-to-br from-violet-600 to-indigo-700 text-white shadow-lg shadow-violet-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-sm">Currently Available</span>
              </div>
              <p className="text-violet-200 text-sm leading-relaxed">
                Open to full-time roles, internships, and freelance projects.
                Response time: within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* ── Right — Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-gray-900/70 rounded-3xl p-8 border border-gray-200 dark:border-gray-700/60 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Send a Message</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-7">
                Fill in the form below and I&apos;ll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Full Name <span className="text-violet-500">*</span>
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Your Name"
                      className={cn(
                        inputBase,
                        errors.name
                          ? "border-red-400 focus:ring-red-400"
                          : "border-gray-200 dark:border-gray-700/60 hover:border-violet-300 dark:hover:border-violet-600"
                      )}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle size={11} />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Email Address <span className="text-violet-500">*</span>
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="your@email.com"
                      className={cn(
                        inputBase,
                        errors.email
                          ? "border-red-400 focus:ring-red-400"
                          : "border-gray-200 dark:border-gray-700/60 hover:border-violet-300 dark:hover:border-violet-600"
                      )}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle size={11} />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Subject <span className="text-violet-500">*</span>
                  </label>
                  <input
                    {...register("subject")}
                    type="text"
                    placeholder="Project inquiry · Job opportunity · Collaboration"
                    className={cn(
                      inputBase,
                      errors.subject
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-200 dark:border-gray-700/60 hover:border-violet-300 dark:hover:border-violet-600"
                    )}
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={11} />
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Message <span className="text-violet-500">*</span>
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell me about your project, timeline, and goals..."
                    className={cn(
                      inputBase,
                      "resize-none",
                      errors.message
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-200 dark:border-gray-700/60 hover:border-violet-300 dark:hover:border-violet-600"
                    )}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={11} />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      Send Message
                    </>
                  )}
                </Button>

                {/* Status messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400"
                  >
                    <CheckCircle size={17} className="shrink-0" />
                    <span className="text-sm font-medium">
                      Message sent successfully — I&apos;ll get back to you soon.
                    </span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400"
                  >
                    <AlertCircle size={17} className="shrink-0" />
                    <span className="text-sm font-medium">
                      Something went wrong. Please try again or email me directly.
                    </span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
