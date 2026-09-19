"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  thumb?: boolean;
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
  const raw = src.startsWith("data:") || src.endsWith(".svg");

  if (thumb) {
    return (
      <span
        className={`relative block h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-night-900 ${
          locked ? "opacity-70" : ""
        } ${className}`}
      >
        {raw ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className={`h-full w-full object-cover ${locked ? "brightness-75 saturate-75" : ""}`} />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="56px"
            className={`object-cover ${locked ? "brightness-75 saturate-75" : ""}`}
          />
        )}
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
      {raw ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${locked ? "brightness-75 blur-[1px]" : ""}`}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 512px) 100vw, 512px"
          priority
          className={`object-cover ${locked ? "brightness-75 blur-[1px]" : ""}`}
        />
      )}
    </div>
  );
}
