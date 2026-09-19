export function SmileMoon({
  className = "",
  title = "Little Glow moon",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      role="img"
      aria-label={title}
    >
      <rect width="512" height="512" fill="#0B1F4A" />
      <circle cx="72" cy="96" r="5" fill="#E8C36A" opacity="0.55" />
      <circle cx="440" cy="140" r="4" fill="#E8C36A" opacity="0.4" />
      <circle cx="448" cy="400" r="3.5" fill="#E8C36A" opacity="0.35" />
      <circle cx="80" cy="420" r="3" fill="#E8C36A" opacity="0.3" />

      <defs>
        <mask id="lg-crescent">
          <rect width="512" height="512" fill="black" />
          <circle cx="236" cy="268" r="168" fill="white" />
          <circle cx="318" cy="232" r="148" fill="black" />
        </mask>
      </defs>

      <circle
        cx="236"
        cy="268"
        r="168"
        fill="#F4ECD8"
        mask="url(#lg-crescent)"
      />

      <g fill="none" stroke="#E8B84A" strokeLinecap="round">
        <path d="M168 232c16-20 40-32 58-24" strokeWidth="14" />
        <path d="M248 226c16-18 40-30 56-22" strokeWidth="14" />
        <path d="M214 318c20 18 52 18 74 0" strokeWidth="12" />
      </g>
      <circle cx="188" cy="286" r="15" fill="#E8B84A" />
      <circle cx="292" cy="280" r="15" fill="#E8B84A" />
    </svg>
  );
}
