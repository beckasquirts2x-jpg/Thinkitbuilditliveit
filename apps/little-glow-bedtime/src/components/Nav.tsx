"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/content";
import { useApp } from "./AppProviders";
import { LILAH_WAVE } from "@/lib/lilah-wave";

const links = [
  { href: "/", label: "Home", emoji: "\ud83c\udfe1" },
  { href: "/story", label: "Story", emoji: "\ud83d\udcd6" },
  { href: "/songs", label: "Songs", emoji: "\ud83c\udfb5" },
  { href: "/timer", label: "Timer", emoji: "\ud83c\udf19" },
  { href: "/settings", label: "Look", emoji: "\ud83c\udfa8" },
];

export function Nav() {
  const pathname = usePathname();
  const { unlocked, timerLabel } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b border-glow-gold/20 bg-night-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-2 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LILAH_WAVE}
            alt=""
            className="h-9 w-9 shrink-0 rounded-2xl object-cover object-top"
          />
          <div className="min-w-0">
            <p className="truncate font-semibold text-glow-gold text-sm sm:text-base">
              {APP_NAME}
            </p>
            {unlocked ? (
              <p className="text-[10px] text-glow-gold/70">Full Glow unlocked</p>
            ) : (
              <p className="text-[10px] text-moon-200/60">Free glow</p>
            )}
          </div>
        </Link>
        {timerLabel && (
          <Link
            href="/timer"
            className="rounded-full bg-glow-gold/15 px-3 py-1 text-xs font-medium text-glow-gold"
          >
            \u23f1 {timerLabel}
          </Link>
        )}
      </div>
      <nav className="mx-auto flex max-w-lg justify-around gap-1 px-2 pb-2">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex min-h-11 min-w-11 flex-1 flex-col items-center justify-center rounded-2xl px-1 py-1.5 text-xs transition ${
                active
                  ? "bg-glow-gold/20 text-glow-gold"
                  : "text-moon-200/80 hover:bg-white/5"
              }`}
            >
              <span className="text-lg leading-none">{link.emoji}</span>
              <span className="mt-0.5">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
