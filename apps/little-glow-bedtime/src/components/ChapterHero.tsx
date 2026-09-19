"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Smaller thumb for index lists */
  thumb?: boolean;
  /** Dim/blur when chapter is locked */
  locked?: boolean;
  className?: string;
};

export function ChapterHero({
  src,
  alt,
  thumb = false,
  locked = false,
  className = "",
}: Props) {
  const unoptimized =
    src.startsWith("data:") || src.endsWith(".svg") || src.endsWith(".jpg");

  if (thumb) {
    return (
      <span
        className={`relative block h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-night-900 ${
          locked ? "opacity-70" : ""
        } ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="56px"
          unoptimized={unoptimized}
          className={`object-cover ${locked ? "brightness-75 saturate-75" : ""}`}
        />
        {locked && (
          <span className="absolute inset-0 flex items-center justify-center bg-night-950/35 text-sm">
            🔒
          </span>
        )}
      </span>
    );
  }

  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-night-900 shadow-glow glow-art ${
        locked ? "opacity-80" : ""
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 512px) 100vw, 512px"
        priority
        unoptimized={unoptimized}
        className={`object-cover ${locked ? "brightness-75 blur-[1px]" : ""}`}
      />
    </div>
  );
}
