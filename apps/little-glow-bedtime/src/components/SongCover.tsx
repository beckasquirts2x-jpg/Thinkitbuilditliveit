"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  thumb?: boolean;
  locked?: boolean;
};

export function SongCover({ src, alt, thumb = false, locked = false }: Props) {
  if (thumb) {
    return (
      <span
        className={`relative block h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-night-900 ${
          locked ? "opacity-70" : ""
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="56px"
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
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-night-900 shadow-glow glow-art">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 512px) 100vw, 512px"
        priority
        className="object-cover"
      />
    </div>
  );
}
