import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/lib/data";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import GlobalBackground from "@/components/ui/GlobalBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-livid-omega.vercel.app"
  ),
  title: `${personalInfo.name} — Senior Software Engineer`,
  description: `${personalInfo.bio} Specializing in React, Next.js, Node.js, and PostgreSQL.`,
  keywords: [
    "Senior Software Engineer",
    "Full-Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "TypeScript",
    "Damoze Motuma",
    "Portfolio",
    "Web Developer",
    "Ethiopia",
  ],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-livid-omega.vercel.app",
    title: `${personalInfo.name} — Senior Software Engineer`,
    description: personalInfo.bio,
    siteName: `${personalInfo.name} Portfolio`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} — Senior Software Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} — Senior Software Engineer`,
    description: personalInfo.bio,
    creator: "@damozemotuma",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <GlobalBackground />
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
