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
      <circle cx="86" cy="92" r="4" fill="#E8C36A" opacity="0.7" />
      <circle cx="430" cy="128" r="3" fill="#E8C36A" opacity="0.55" />
      <circle cx="460" cy="380" r="3.5" fill="#E8C36A" opacity="0.45" />
      <circle cx="70" cy="400" r="3" fill="#E8C36A" opacity="0.4" />
      <path
        d="M286 86c-86 8-154 80-154 170 0 94 76 170 170 170 42 0 80-15 110-40-28 12-58 18-90 18-100 0-180-80-180-178 0-86 60-158 144-174z"
        fill="#F6EFE0"
      />
      <path
        d="M168 128c48-48 116-70 178-58 8 2 10 12 4 16-62-4-118 18-158 58-6 6-16 2-16-6 0-4 0-8-8-10z"
        fill="#F6EFE0"
      />
      <path
        d="M176 214c18-22 42-34 56-28"
        fill="none"
        stroke="#E8C36A"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M268 210c16-20 40-32 54-26"
        fill="none"
        stroke="#E8C36A"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <circle cx="196" cy="268" r="16" fill="#E8C36A" />
      <circle cx="300" cy="264" r="16" fill="#E8C36A" />
      <path
        d="M224 292c18 16 48 16 66 0"
        fill="none"
        stroke="#E8C36A"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
