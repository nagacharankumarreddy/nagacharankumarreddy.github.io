const DUST = [
  [930, 210, 1.6], [888, 330, 1.2], [956, 120, 1.4], [842, 452, 1.3], [905, 406, 1],
  [870, 250, 1.1], [990, 300, 1.5], [820, 380, 0.9], [940, 470, 1.2], [1010, 180, 1],
];

// Light rays that burst from the figure's body as the section scrolls (see About.tsx).
const BODY = { x: 800, y: 585 };
const RAYS = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2 + 0.07;
  const length = 300 + ((i * 97) % 5) * 70;
  const half = 0.022 + ((i * 53) % 4) * 0.009;
  const point = (a: number) => `${(length * Math.cos(a)).toFixed(1)},${(length * Math.sin(a)).toFixed(1)}`;
  return { key: i, angle, points: `0,0 ${point(angle - half)} ${point(angle + half)}` };
}).filter((ray) => Math.sin(ray.angle) < 0.55); // none aimed down into the floor

// A lone figure (bowed at first, standing tall once the section is scrolled) bowing under a diagonal spotlight, drawn in SVG so it stays sharp at any size.
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
      <radialGradient id="aw-rays" cx="0" cy="0" r="520" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fff" stopOpacity="0.8" />
        <stop offset="0.45" stopColor="#fff" stopOpacity="0.22" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="aw-core" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <filter id="aw-ray-blur" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3.5" />
      </filter>
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

    <ellipse className="aw-art-shadow" cx="800" cy="644" rx="34" ry="5" fill="#000" opacity="0.7" />

    <g transform={`translate(${BODY.x} ${BODY.y})`}>
      <g className="aw-art-lift">
        <g className="aw-art-rays" opacity="0" style={{ mixBlendMode: "screen" }}>
          <circle cx="0" cy="0" r="120" fill="url(#aw-core)" />
          <g filter="url(#aw-ray-blur)">
            {RAYS.map((ray) => (
              <polygon key={ray.key} points={ray.points} fill="url(#aw-rays)" />
            ))}
          </g>
        </g>
      </g>
    </g>

    <g className="aw-art-figure" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" filter="url(#aw-glow)">
      <path className="aw-fig-leg-a" d="M812 640 L808 596 L812 556" strokeWidth="9" />
      <path className="aw-fig-leg-b" d="M796 640 L800 598 L810 556" strokeWidth="9" />
      <path className="aw-fig-torso" d="M811 556 Q796 534 768 530" strokeWidth="15" />
      <path className="aw-fig-arm-a" d="M772 534 Q762 560 764 584" strokeWidth="6" />
      <path className="aw-fig-arm-b" d="M790 538 Q800 552 812 558" strokeWidth="6" />
      <circle className="aw-fig-head" cx="754" cy="540" r="10.5" fill="#fff" stroke="none" />

      {/* Sword: drawn in the front hand once he stands, then twirled (see About.tsx). */}
      <g transform="translate(830 566)">
        <g className="aw-sword-hand">
        <g className="aw-sword" opacity="0">
          <path d="M0 11 L0 -3" stroke="#8c8c8c" strokeWidth="5" />
          <circle cx="0" cy="12" r="3.2" fill="#bdbdbd" stroke="none" />
          <path d="M-12 -5 L12 -5" stroke="#d6d6d6" strokeWidth="4" />
          <polygon points="-4.5,-7 4.5,-7 3,-112 0,-126 -3,-112" fill="#fff" stroke="none" />
          <path d="M0 -9 L0 -108" stroke="#9a9a9a" strokeWidth="1.2" opacity="0.8" />
        </g>
        </g>
      </g>

      {/* Slash trails, drawn and wiped by the fight moves. */}
      {["M846 372 Q962 420 940 592", "M944 560 Q826 318 686 470"].map((d, i) => (
        <path
          key={d}
          className={`aw-slash aw-slash-${i + 1}`}
          d={d}
          strokeWidth="5"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset="100"
          opacity="0"
        />
      ))}
    </g>
  </svg>
);
