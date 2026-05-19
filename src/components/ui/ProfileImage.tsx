"use client";

import { useState } from "react";
import Image from "next/image";
import { personalInfo } from "@/lib/data";

interface ProfileImageProps {
  src: string;
  alt?: string;
  className?: string;
  /** Size in px — used for width/height on the Next.js Image */
  size?: number;
  /** Show initials fallback when image fails or src is empty */
  fallbackInitials?: string;
}

/**
 * ProfileImage
 * ─────────────
 * Renders a Next.js <Image> with an automatic initials fallback.
 *
 * HOW TO USE:
 *   1. Drop your photo into  public/images/avatar.jpg
 *   2. Update assets.heroPhoto in src/lib/data.ts
 *   3. This component handles the rest — no broken images ever.
 */
export default function ProfileImage({
  src,
  alt = personalInfo.name,
  className = "",
  size = 320,
  fallbackInitials,
}: ProfileImageProps) {
  const [error, setError] = useState(false);

  const initials =
    fallbackInitials ??
    `${personalInfo.firstName[0]}${personalInfo.lastName[0]}`;

  // Show initials if no src provided or image failed to load
  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-violet-700 to-indigo-700 select-none ${className}`}
        aria-label={alt}
      >
        <span
          className="font-extrabold text-white/60"
          style={{ fontSize: size * 0.28 }}
        >
          {initials}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`object-cover ${className}`}
      onError={() => setError(true)}
      priority
    />
  );
}
