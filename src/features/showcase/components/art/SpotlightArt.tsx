const DUST = [
  [930, 210, 1.6], [888, 330, 1.2], [956, 120, 1.4], [842, 452, 1.3], [905, 406, 1],
  [870, 250, 1.1], [990, 300, 1.5], [820, 380, 0.9], [940, 470, 1.2], [1010, 180, 1],
];

// A lone figure bowing under a diagonal spotlight, drawn in SVG so it stays sharp at any size.
export const SpotlightArt = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 1600 900"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="aw-beam" x1="1060" y1="-60" x2="790" y2="660" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
        <stop offset="0.6" stopColor="#fff" stopOpacity="0.28" />
        <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
      </linearGradient>
      <radialGradient id="aw-floor" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <filter id="aw-soft" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="14" />
      </filter>
      <filter id="aw-wide" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="40" />
      </filter>
      <filter id="aw-glow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="halo" />
        <feMerge>
          <feMergeNode in="halo" />
          <feMergeNode in="halo" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <rect width="1600" height="900" fill="#050505" />

    <g className="aw-art-beam">
      <polygon points="950,-80 1130,-80 1010,660 600,660" fill="url(#aw-beam)" filter="url(#aw-wide)" opacity="0.55" />
      <polygon points="985,-60 1065,-60 935,650 690,650" fill="url(#aw-beam)" filter="url(#aw-soft)" />
      <ellipse cx="806" cy="646" rx="190" ry="26" fill="url(#aw-floor)" />
      <g fill="#fff">
        {DUST.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} opacity="0.5" />
        ))}
      </g>
    </g>

    <ellipse cx="800" cy="644" rx="34" ry="5" fill="#000" opacity="0.7" />

    <g className="aw-art-figure" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" filter="url(#aw-glow)">
      <path d="M812 640 L808 596 L812 556" strokeWidth="9" />
      <path d="M796 640 L800 598 L810 556" strokeWidth="9" />
      <path d="M811 556 Q796 534 768 530" strokeWidth="15" />
      <path d="M772 534 Q762 560 764 584" strokeWidth="6" />
      <path d="M790 538 Q800 552 812 558" strokeWidth="6" />
      <circle cx="754" cy="540" r="10.5" fill="#fff" stroke="none" />
    </g>
  </svg>
);
