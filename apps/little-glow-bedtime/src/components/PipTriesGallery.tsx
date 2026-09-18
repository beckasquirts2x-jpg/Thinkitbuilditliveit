"use client";

import Image from "next/image";
import { pipTriesPanels } from "@/lib/art";

export function PipTriesGallery() {
  return (
    <section className="space-y-3" aria-label="Pip’s idea gallery">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-glow-gold/80">
        Pip’s ideas
      </h2>
      <p className="text-sm text-moon-200/70">
        Soft pictures of every try — sparks, polish, choir, blanket, and more.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {pipTriesPanels.map((panel) => (
          <figure
            key={panel.src}
            className="overflow-hidden rounded-2xl border border-white/10 bg-night-900/70 glow-soft"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={panel.src}
                alt={panel.label}
                fill
                sizes="(max-width: 512px) 45vw, 160px"
                className="object-cover"
              />
            </div>
            <figcaption className="px-2 py-1.5 text-center text-xs text-moon-200/75">
              {panel.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
