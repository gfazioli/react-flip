export function Logo({ size = 28 }: { size?: number }) {
  // Mini half-flipped 3D card mark — gradient on the front face,
  // skewed to suggest the rotation in flight.
  const w = size * 2;
  const h = size;
  return (
    <svg width={w} height={h} viewBox="0 0 64 32" aria-hidden="true">
      <defs>
        <linearGradient id="flip-logo-front" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="flip-logo-back" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.45" />
          <stop offset="1" stopColor="#06b6d4" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* back face hint, slightly offset */}
      <rect
        x="6"
        y="6"
        width="40"
        height="22"
        rx="3"
        fill="url(#flip-logo-back)"
        transform="matrix(0.92 0.18 -0.18 0.92 8 0)"
      />
      {/* front face, mid-flip */}
      <rect
        x="14"
        y="4"
        width="40"
        height="22"
        rx="3"
        fill="url(#flip-logo-front)"
        transform="matrix(0.92 -0.18 0.18 0.92 -2 4)"
      />
    </svg>
  );
}
