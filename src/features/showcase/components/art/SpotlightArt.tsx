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
      <linearGradient id="aw-beam" x1="1010" y1="-40" x2="800" y2="640" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
        <stop offset="0.7" stopColor="#fff" stopOpacity="0.2" />
        <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
      </linearGradient>
      <radialGradient id="aw-floor" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <filter id="aw-soft" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="10" />
      </filter>
    </defs>

    <rect width="1600" height="900" fill="#050505" />
    <polygon points="985,-60 1045,-60 925,648 690,648" fill="url(#aw-beam)" filter="url(#aw-soft)" />
    <ellipse cx="806" cy="646" rx="170" ry="24" fill="url(#aw-floor)" />

    <g stroke="#dcdcdc" strokeLinecap="round" strokeLinejoin="round">
      <path d="M812 640 L808 596 L812 556" strokeWidth="9" />
      <path d="M796 640 L800 598 L810 556" strokeWidth="9" />
      <path d="M811 556 Q796 534 768 530" strokeWidth="15" />
      <path d="M772 534 Q762 560 764 584" strokeWidth="6" />
      <path d="M790 538 Q800 552 812 558" strokeWidth="6" />
      <circle cx="754" cy="540" r="10.5" fill="#dcdcdc" stroke="none" />
    </g>
    <ellipse cx="800" cy="644" rx="34" ry="5" fill="#000" opacity="0.7" />

    <g fill="#fff">
      <circle cx="930" cy="210" r="1.6" opacity="0.5" />
      <circle cx="888" cy="330" r="1.2" opacity="0.4" />
      <circle cx="956" cy="120" r="1.4" opacity="0.5" />
      <circle cx="842" cy="452" r="1.3" opacity="0.35" />
      <circle cx="905" cy="406" r="1" opacity="0.4" />
    </g>
  </svg>
);
