import { useMemo } from "react";

const W = 1600;
const H = 900;

const VORTICES = [
  { x: 560, y: 300, r: 230, spin: 1 },
  { x: 930, y: 400, r: 190, spin: -1 },
  { x: 1240, y: 250, r: 170, spin: 1 },
  { x: 260, y: 190, r: 130, spin: -1 },
];

const STARS = [
  [120, 90, 26],
  [400, 70, 20],
  [720, 110, 30],
  [1010, 80, 22],
  [1130, 470, 24],
  [200, 420, 22],
  [740, 560, 20],
  [1480, 430, 26],
  [1500, 640, 18],
];

const CASTLE =
  "M 30 900 V 700 H 52 V 678 H 74 V 700 H 96 V 678 H 118 V 700 H 140 V 600 H 130 L 170 462 L 210 600 H 200 V 722 H 262 V 540 H 250 L 292 372 L 300 318 L 308 372 L 350 540 H 338 V 700 H 400 V 622 H 390 L 425 512 L 460 622 H 450 V 742 H 520 V 764 H 566 V 900 Z";

const WINDOWS = [
  [170, 630],
  [300, 590],
  [300, 652],
  [425, 668],
  [86, 760],
  [232, 780],
];

const mulberry = (seed: number) => () => {
  seed += 0x6d2b79f5;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const flow = (x: number, y: number) => {
  let vx = 1;
  let vy = 0.14 * Math.sin(x / 170) + 0.08 * Math.cos(y / 90);
  for (const v of VORTICES) {
    const dx = x - v.x;
    const dy = y - v.y;
    const d = Math.hypot(dx, dy) || 1;
    const weight = Math.exp(-(d * d) / (2 * v.r * v.r)) * 3.4;
    vx += ((-dy / d) * v.spin - (dx / d) * 0.22) * weight;
    vy += ((dx / d) * v.spin - (dy / d) * 0.22) * weight;
  }
  const length = Math.hypot(vx, vy) || 1;
  return [vx / length, vy / length];
};

// Short streamlines traced through a swirling vector field, drawn like engraved hatching.
const buildSky = () => {
  const random = mulberry(26);
  const groups = ["", "", ""];
  const cols = 34;
  const rows = 17;
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      let x = ((c + random()) / cols) * W;
      let y = ((r + random()) / rows) * 770;
      const steps = 8 + Math.floor(random() * 12);
      let d = `M${x.toFixed(0)} ${y.toFixed(0)}`;
      for (let i = 0; i < steps; i++) {
        const [vx, vy] = flow(x, y);
        x += vx * 11;
        y += vy * 11;
        d += `L${x.toFixed(0)} ${y.toFixed(0)}`;
      }
      groups[Math.floor(random() * 3)] += d;
    }
  }
  return groups;
};

const buildHills = () =>
  Array.from({ length: 7 }, (_, k) => {
    let d = "";
    for (let x = 0; x <= W; x += 40) {
      const y = 772 + k * 19 + Math.sin(x / 150 + k * 0.9) * 15 + Math.sin(x / 61 + k) * 4;
      d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(0)}`;
    }
    return d;
  });

export const StarryNight = ({ className = "" }: { className?: string }) => {
  const sky = useMemo(buildSky, []);
  const hills = useMemo(buildHills, []);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="#0a0a0a"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d={sky[0]} strokeWidth="1" opacity="0.38" />
      <path d={sky[1]} strokeWidth="1.6" opacity="0.46" />
      <path d={sky[2]} strokeWidth="2.4" opacity="0.5" />

      {STARS.map(([x, y, r]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={r * 0.28} fill="#0a0a0a" stroke="none" />
          <circle cx={x} cy={y} r={r * 0.7} strokeWidth="2" strokeDasharray="5 6" />
          <circle cx={x} cy={y} r={r * 1.15} strokeWidth="1.6" strokeDasharray="9 8" opacity="0.8" />
          <circle cx={x} cy={y} r={r * 1.65} strokeWidth="1.2" strokeDasharray="12 11" opacity="0.6" />
        </g>
      ))}

      <g>
        <path d="M1400 96a58 58 0 1 0 44 98a46 46 0 1 1-44-98z" fill="#0a0a0a" stroke="none" />
        <circle cx="1410" cy="150" r="82" strokeWidth="2" strokeDasharray="10 9" />
        <circle cx="1410" cy="150" r="108" strokeWidth="1.5" strokeDasharray="14 12" opacity="0.7" />
      </g>

      {hills.map((d, i) => (
        <path key={i} d={d} strokeWidth="1.5" opacity="0.6" />
      ))}

      <g transform="translate(0 378) scale(0.58)" stroke="none">
        <path d={CASTLE} fill="#0a0a0a" />
        {WINDOWS.map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            d={`M${x - 6} ${y + 20}V${y + 4}Q${x} ${y - 12} ${x + 6} ${y + 4}V${y + 20}Z`}
            fill="#ededed"
          />
        ))}
      </g>
    </svg>
  );
};
