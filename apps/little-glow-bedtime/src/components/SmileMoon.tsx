import { APP_COVER_SRC } from "./app-cover-src";

export function SmileMoon({
  className = "",
  title = "Little Glow moon",
}: {
  className?: string;
  title?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={APP_COVER_SRC}
      alt={title}
      className={`object-contain ${className}`}
    />
  );
}
