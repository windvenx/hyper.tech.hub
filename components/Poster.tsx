// Иллюстрации в стилистике логотипа: красный фон, белые лучи, жирный чёрный контур.
// Чистый SVG — лёгкие, чёткие на любом экране и без внешних файлов.

const RED = "#C8232B";
const LIGHT = "#E6E6E6";
const INK = "#0A0A0A";

function Rays({ cx, cy, count = 30 }: { cx: number; cy: number; count?: number }) {
  const rays = Array.from({ length: count }, (_, i) => {
    const a0 = (i / count) * Math.PI * 2;
    const a1 = a0 + (Math.PI * 2) / count / 2.6;
    const r = 900;
    // округляем, чтобы разметка сервера и браузера совпадала при гидратации
    const pt = (a: number) => `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    return `${cx},${cy} ${pt(a0)} ${pt(a1)}`;
  });
  return (
    <g fill={LIGHT} opacity={0.9}>
      {rays.map((p, i) => (
        <polygon key={i} points={p} />
      ))}
    </g>
  );
}

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={label} className="h-auto w-full">
      <defs>
        <clipPath id={`clip-${label}`}>
          <rect x="0" y="0" width="400" height="500" />
        </clipPath>
      </defs>
      <g clipPath={`url(#clip-${label})`}>
        <rect width="400" height="500" fill={RED} />
        {children}
      </g>
    </svg>
  );
}

// Паяльник над платой
function Solder() {
  return (
    <Frame label="solder">
      <Rays cx={290} cy={330} />
      {/* плата */}
      <g transform="translate(40 330) skewX(-8)">
        <rect width="320" height="130" fill={INK} stroke={INK} strokeWidth="8" />
        <rect x="10" y="10" width="300" height="110" fill={LIGHT} />
        <g stroke={INK} strokeWidth="5" fill="none" strokeLinecap="square">
          <path d="M20 40 H120 V80 H200" />
          <path d="M20 100 H90 V60" />
          <path d="M300 30 H230 V95 H140" />
        </g>
        <rect x="210" y="40" width="70" height="50" fill={INK} />
        <g fill={RED} stroke={INK} strokeWidth="4">
          <rect x="120" y="70" width="34" height="20" />
          <rect x="60" y="20" width="26" height="16" />
        </g>
        <circle cx="200" cy="80" r="8" fill={RED} stroke={INK} strokeWidth="4" />
      </g>
      {/* дым */}
      <path
        d="M205 315 C 180 290, 230 275, 205 250 S 225 205, 200 185"
        fill="none"
        stroke={LIGHT}
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* паяльник */}
      <g transform="rotate(-38 205 320)">
        <path d="M205 320 L 222 300 L 222 290 L 188 290 L 188 300 Z" fill={LIGHT} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <rect x="194" y="160" width="22" height="132" fill={LIGHT} stroke={INK} strokeWidth="7" />
        <rect x="180" y="20" width="50" height="148" rx="12" fill={INK} />
        <rect x="186" y="28" width="38" height="132" rx="8" fill={RED} />
        <g stroke={INK} strokeWidth="6">
          <line x1="186" y1="60" x2="224" y2="60" />
          <line x1="186" y1="80" x2="224" y2="80" />
          <line x1="186" y1="100" x2="224" y2="100" />
          <line x1="186" y1="120" x2="224" y2="120" />
        </g>
      </g>
    </Frame>
  );
}

// Процессор крупным планом
function Chip() {
  const pins = Array.from({ length: 7 }, (_, i) => 120 + i * 27);
  return (
    <Frame label="chip">
      <Rays cx={200} cy={250} count={34} />
      <g stroke={INK} strokeWidth="6" fill={LIGHT}>
        {pins.map((p) => (
          <g key={p}>
            <rect x={p - 6} y="70" width="12" height="40" />
            <rect x={p - 6} y="390" width="12" height="40" />
            <rect x="20" y={p + 4} width="40" height="12" />
            <rect x="340" y={p + 4} width="40" height="12" />
          </g>
        ))}
      </g>
      <rect x="60" y="105" width="280" height="290" rx="14" fill={INK} />
      <rect x="85" y="130" width="230" height="240" rx="6" fill={LIGHT} stroke={INK} strokeWidth="6" />
      <rect x="120" y="170" width="160" height="160" fill={RED} stroke={INK} strokeWidth="8" />
      <text
        x="200"
        y="262"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontStyle="italic"
        fontWeight="900"
        fontSize="40"
        fill={LIGHT}
      >
        HYPER
      </text>
      <text x="200" y="300" textAnchor="middle" fontFamily="monospace" fontSize="13" letterSpacing="3" fill={INK}>
        HX-2026
      </text>
      <circle cx="105" cy="350" r="7" fill={INK} />
    </Frame>
  );
}

// Мультиметр с щупами
function Meter() {
  return (
    <Frame label="meter">
      <Rays cx={120} cy={420} />
      <path d="M150 400 C 90 470, 40 420, 30 520" fill="none" stroke={INK} strokeWidth="10" />
      <path d="M250 400 C 320 470, 360 430, 380 520" fill="none" stroke={INK} strokeWidth="10" />
      <rect x="100" y="70" width="200" height="340" rx="22" fill={INK} />
      <rect x="112" y="82" width="176" height="316" rx="14" fill={RED} />
      <rect x="128" y="100" width="144" height="80" fill={LIGHT} stroke={INK} strokeWidth="6" />
      <text x="200" y="157" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="40" fill={INK}>
        12.04
      </text>
      <circle cx="200" cy="265" r="54" fill={LIGHT} stroke={INK} strokeWidth="8" />
      <rect x="194" y="215" width="12" height="44" fill={INK} transform="rotate(35 200 265)" />
      <g fill={INK}>
        <circle cx="150" cy="365" r="12" />
        <circle cx="250" cy="365" r="12" />
      </g>
    </Frame>
  );
}

const VARIANTS = { solder: Solder, chip: Chip, meter: Meter };

export default function Poster({ variant, className = "" }: { variant: keyof typeof VARIANTS; className?: string }) {
  const Art = VARIANTS[variant];
  return (
    <div className={`relative border-4 border-black bg-black shadow-[0_0_60px_-20px_rgb(229_9_20/0.6)] ${className}`}>
      <Art />
    </div>
  );
}
