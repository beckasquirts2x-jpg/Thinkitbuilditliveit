export function GlowMark({
  className = "",
  title = "Little Glow",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title}>
      <rect width="64" height="64" rx="16" fill="#0B1F4A" />
      <circle cx="32" cy="32" r="14" fill="#F4D27A" opacity="0.25" />
      <circle cx="32" cy="32" r="8" fill="#F4D27A" />
      <circle cx="32" cy="32" r="3.5" fill="#FFF6D4" />
      <path
        d="M32 10 L33.2 18 L32 20 L30.8 18 Z M54 32 L46 30.8 L44 32 L46 33.2 Z M32 54 L30.8 46 L32 44 L33.2 46 Z M10 32 L18 33.2 L20 32 L18 30.8 Z"
        fill="#F4D27A"
      />
      <circle cx="16" cy="16" r="1.6" fill="#F4D27A" />
      <circle cx="48" cy="18" r="1.3" fill="#FFE9A8" />
      <circle cx="47" cy="46" r="1.5" fill="#F4D27A" />
      <circle cx="17" cy="47" r="1.2" fill="#FFE9A8" />
    </svg>
  );
}
