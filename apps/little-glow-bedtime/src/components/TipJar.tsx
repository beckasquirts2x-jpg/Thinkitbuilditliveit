export function TipJar() {
  return (
    <a
      href="mailto:hello@example.com?subject=Little%20Glow%20Cocoa%20Tip"
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-glow-gold/40 bg-glow-gold/10 px-5 py-3 text-sm font-medium text-glow-gold transition hover:bg-glow-gold/20"
    >
      <span aria-hidden>☕</span>
      Buy me a cocoa
    </a>
  );
}
