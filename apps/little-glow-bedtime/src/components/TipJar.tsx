const tipUrl = process.env.NEXT_PUBLIC_TIP_URL?.trim() || "";
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "";

export function TipJar() {
  if (tipUrl) {
    return (
      <a
        href={tipUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-glow-gold/40 bg-glow-gold/10 px-5 py-3 text-sm font-medium text-glow-gold transition hover:bg-glow-gold/20"
      >
        <span aria-hidden>☕</span>
        Buy me a cocoa
      </a>
    );
  }

  if (contactEmail) {
    return (
      <a
        href={`mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent("Little Glow Cocoa Tip")}`}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-glow-gold/40 bg-glow-gold/10 px-5 py-3 text-sm font-medium text-glow-gold transition hover:bg-glow-gold/20"
      >
        <span aria-hidden>☕</span>
        Buy me a cocoa
      </a>
    );
  }

  return (
    <span className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-night-900/60 px-5 py-3 text-sm text-moon-200/70">
      <span aria-hidden>☕</span>
      Tips coming soon
    </span>
  );
}
