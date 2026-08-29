function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, (n >> 16) + amt));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amt));
  const b = Math.min(255, Math.max(0, (n & 0xff) + amt));
  return `rgb(${r}, ${g}, ${b})`;
}

export type CarAngle = "front" | "side" | "rear";

function uid(seed: string) {
  return seed.replace(/[^a-zA-Z0-9]/g, "");
}

function FrontView({ color, id }: { color: string; id: string }) {
  const light = shade(color, 35);
  const dark = shade(color, -35);
  return (
    <>
      <ellipse cx="200" cy="182" rx="145" ry="10" fill="var(--fc-shadow, #cbd5e1)" opacity="0.6" />
      <path
        d="M75 158 L92 100 Q108 72 155 70 L245 70 Q292 72 308 100 L325 158 Z"
        fill={`url(#body-${id})`}
      />
      <path d="M130 96 L148 76 L252 76 L270 96 Z" fill="white" opacity="0.28" />
      <path d="M96 108 Q108 84 155 82 L188 82 L182 122 L100 122 Z" fill={`url(#glass-${id})`} />
      <path d="M212 82 L245 82 Q288 84 300 108 L300 122 L218 122 Z" fill={`url(#glass-${id})`} />
      <rect x="70" y="150" width="260" height="20" rx="7" fill={dark} />
      <rect x="150" y="150" width="100" height="10" rx="4" fill={light} opacity="0.5" />
      <circle cx="128" cy="172" r="25" fill="#1f2430" />
      <circle cx="128" cy="172" r="12" fill="#c3c9d6" />
      <circle cx="272" cy="172" r="25" fill="#1f2430" />
      <circle cx="272" cy="172" r="12" fill="#c3c9d6" />
      <path d="M80 128 L112 122 L118 138 L84 144 Z" fill="#fef3c7" opacity="0.9" />
      <path d="M320 128 L288 122 L282 138 L316 144 Z" fill="#fecaca" opacity="0.85" />
    </>
  );
}

function SideView({ color, id }: { color: string; id: string }) {
  const dark = shade(color, -35);
  return (
    <>
      <ellipse cx="200" cy="182" rx="160" ry="9" fill="var(--fc-shadow, #cbd5e1)" opacity="0.6" />
      <path
        d="M52 158 Q52 128 88 122 L112 90 Q124 76 148 76 L252 76 Q276 76 290 92 L312 122 Q348 126 348 158 Z"
        fill={`url(#body-${id})`}
      />
      <path
        d="M126 96 L146 82 L196 82 L196 120 L110 120 Z"
        fill={`url(#glass-${id})`}
      />
      <path d="M204 82 L250 82 L282 96 L296 120 L204 120 Z" fill={`url(#glass-${id})`} />
      <rect x="52" y="150" width="296" height="18" rx="6" fill={dark} />
      <circle cx="122" cy="172" r="26" fill="#1f2430" />
      <circle cx="122" cy="172" r="13" fill="#c3c9d6" />
      <circle cx="288" cy="172" r="26" fill="#1f2430" />
      <circle cx="288" cy="172" r="13" fill="#c3c9d6" />
      <rect x="150" y="112" width="30" height="7" rx="2" fill="white" opacity="0.5" />
    </>
  );
}

function RearView({ color, id }: { color: string; id: string }) {
  const dark = shade(color, -35);
  return (
    <>
      <ellipse cx="200" cy="182" rx="145" ry="10" fill="var(--fc-shadow, #cbd5e1)" opacity="0.6" />
      <path
        d="M75 158 L92 100 Q108 72 155 70 L245 70 Q292 72 308 100 L325 158 Z"
        fill={`url(#body-${id})`}
      />
      <path d="M96 96 L114 80 L188 80 L182 122 L100 122 Z" fill={`url(#glass-${id})`} />
      <path d="M212 80 L286 80 L304 96 L300 122 L218 122 Z" fill={`url(#glass-${id})`} />
      <rect x="70" y="150" width="260" height="20" rx="7" fill={dark} />
      <rect x="140" y="146" width="120" height="8" rx="3" fill={dark} opacity="0.7" />
      <circle cx="128" cy="172" r="25" fill="#1f2430" />
      <circle cx="128" cy="172" r="12" fill="#c3c9d6" />
      <circle cx="272" cy="172" r="25" fill="#1f2430" />
      <circle cx="272" cy="172" r="12" fill="#c3c9d6" />
      <rect x="82" y="120" width="34" height="16" rx="4" fill="#fecaca" opacity="0.9" />
      <rect x="284" y="120" width="34" height="16" rx="4" fill="#fecaca" opacity="0.9" />
    </>
  );
}

export default function CarImage({
  color,
  angle = "front",
  className,
}: {
  color: string;
  angle?: CarAngle;
  className?: string;
}) {
  const id = uid(color + angle);
  const light = shade(color, 40);
  const dark = shade(color, -25);

  return (
    <svg
      viewBox="0 0 400 220"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--fc-sky-top, #eef2f7)" />
          <stop offset="1" stopColor="var(--fc-sky-bottom, #f8f7f2)" />
        </linearGradient>
        <linearGradient id={`body-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="0.55" stopColor={color} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
        <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dbeafe" stopOpacity="0.9" />
          <stop offset="1" stopColor="#93a4bd" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill={`url(#bg-${id})`} />
      {angle === "front" && <FrontView color={color} id={id} />}
      {angle === "side" && <SideView color={color} id={id} />}
      {angle === "rear" && <RearView color={color} id={id} />}
    </svg>
  );
}
