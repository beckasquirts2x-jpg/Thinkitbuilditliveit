import Image from "next/image";
import Link from "next/link";
import { HOME_HERO } from "@/lib/art";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-lg flex-col items-center justify-center space-y-5 px-4 text-center">
      <div className="glow-soft relative h-40 w-40 overflow-hidden rounded-full border border-glow-gold/30 shadow-glow">
        <Image
          src={HOME_HERO}
          alt="Pip’s glow"
          fill
          sizes="160px"
          className="object-cover"
          priority
        />
      </div>
      <p className="text-5xl" aria-hidden>
        ✨
      </p>
      <h1 className="text-2xl font-bold text-glow-gold">Lost in the gray night?</h1>
      <p className="max-w-sm text-moon-200/80">
        Pip looked everywhere — this page isn’t here. Let’s fly home and find a
        cozy chapter instead.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-glow-gold px-5 font-semibold text-night-950"
        >
          Go home
        </Link>
        <Link
          href="/story"
          className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-glow-gold/40 px-5 font-medium text-glow-gold"
        >
          Read a story
        </Link>
      </div>
    </div>
  );
}
