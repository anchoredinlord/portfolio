"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Send, Heart, Download, FileText, ArrowUp } from "lucide-react";
import { personalInfo, navLinks, assets } from "@/lib/data";

const socialLinks = [
  { icon: Github,   href: personalInfo.github,   label: "GitHub" },
  { icon: Linkedin, href: personalInfo.linkedin,  label: "LinkedIn" },
  { icon: Twitter,  href: personalInfo.twitter,   label: "Twitter" },
  { icon: Send,     href: personalInfo.telegram,  label: "Telegram" },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-950/80 backdrop-blur-md text-gray-400 border-t border-violet-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-3">
              {personalInfo.firstName}.
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              {personalInfo.bio}
            </p>
            {/* Resume download */}
            <motion.a
              href={assets.resume}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600/20 border border-violet-600/40 text-violet-300 text-sm font-medium hover:bg-violet-600/30 hover:border-violet-500 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={14} />
              Download CV
            </motion.a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-gray-500 hover:text-violet-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents */}
          <div>
            <h3 className="text-white font-semibold mb-4">Documents</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={assets.resume}
                  download
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-400 transition-colors"
                >
                  <FileText size={13} />
                  Resume / CV
                </a>
              </li>
              {/* Add more documents here as needed */}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-sm text-gray-500 hover:text-violet-400 transition-colors block mb-1 break-all"
            >
              {personalInfo.email}
            </a>
            <p className="text-sm text-gray-500 mb-4">{personalInfo.location}</p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-violet-400 hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600 flex items-center gap-1">
              Built with <Heart size={12} className="text-red-500 fill-red-500 mx-1" /> using Next.js &amp; Tailwind CSS
            </p>
            {/* Scroll to top — always visible here */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-9 h-9 rounded-full bg-violet-600 hover:bg-violet-500
                         flex items-center justify-center text-white
                         border border-violet-400
                         shadow-[0_0_14px_3px_rgba(124,58,237,0.5)]
                         hover:shadow-[0_0_20px_5px_rgba(124,58,237,0.7)]
                         transition-all duration-200"
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
