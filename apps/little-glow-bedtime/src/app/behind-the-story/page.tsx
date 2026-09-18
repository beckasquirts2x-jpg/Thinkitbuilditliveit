import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { behindTheStoryArt } from "@/lib/art";
import { APP_NAME, AUTHOR, stories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Behind the story",
  description:
    "How Little Glow Bedtime grows from manuscript themes into a movie — art gallery and notes from Hattie Watson.",
};

export default function BehindTheStoryPage() {
  const moon = stories[0];

  return (
    <div className="space-y-6">
      <header>
        <Link href="/" className="text-sm text-glow-gold/80">
          ← Home
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-glow-gold">
          Behind the story
        </h1>
        <p className="mt-2 text-sm text-moon-200/80">
          How {APP_NAME} becomes a movie — soft notes from the manuscript, by{" "}
          {AUTHOR}.
        </p>
      </header>

      <section className="space-y-3 rounded-3xl border border-white/10 bg-night-900/60 p-5 text-moon-200/90">
        <h2 className="text-lg font-semibold text-glow-gold">Movie path</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed">
          <li>
            <strong className="text-glow-soft">One spark opens the night.</strong>{" "}
            Pip’s tiny glow is the camera’s first light — kids feel small and
            brave at once ({moon.chapters[0]?.title}).
          </li>
          <li>
            <strong className="text-glow-soft">Keep Luma dark.</strong> Until the
            finale, the moon stays charcoal. Failed helps (sparks, polish, choir,
            blanket) are comedy that never “fixes” her with borrowed shine.
          </li>
          <li>
            <strong className="text-glow-soft">Other lights are kind, not cures.</strong>{" "}
            Lantern, Jack, candle, Glowcap, streetlight, stars — each tries;
            none replace Luma’s own glow.
          </li>
          <li>
            <strong className="text-glow-soft">Ask bigger, then stay closer.</strong>{" "}
            The Sun points to Mars’s moons; Phob & Deim teach: small lights fix
            big dark <em>together</em> — by staying, sharing a real spark.
          </li>
          <li>
            <strong className="text-glow-soft">Finale is share, not size.</strong>{" "}
            Pip offers her own glow. Luma brightens. Lesson:{" "}
            <em>{moon.lesson}</em>
          </li>
        </ol>
        <p className="text-xs text-moon-200/55">
          No ads · No subscription in the app v1 — the story world stays soft
          while the film path grows.
        </p>
      </section>

      <section className="space-y-3" aria-label="Story art gallery">
        <h2 className="text-lg font-semibold text-glow-gold">Art gallery</h2>
        <p className="text-sm text-moon-200/70">
          Key frames from the Moon story — mood boards for the screen.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {behindTheStoryArt.map((item) => (
            <figure
              key={item.src}
              className="overflow-hidden rounded-3xl border border-white/10 bg-night-900/70 glow-soft"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 512px) 100vw, 256px"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-3 py-2 text-center text-xs text-moon-200/75">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <p className="text-center text-sm">
        <Link href="/story/moon-forgot" className="text-glow-gold underline">
          Read The Moon Forgot Its Glow →
        </Link>
      </p>
    </div>
  );
}
