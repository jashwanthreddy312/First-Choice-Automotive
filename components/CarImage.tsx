export default function CarImage({
  color,
  className,
}: {
  color: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 220"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="220" fill="#f1f5f9" />
      <ellipse cx="200" cy="175" rx="150" ry="12" fill="#cbd5e1" />
      <path
        d="M60 150 L75 105 Q90 80 130 78 L270 78 Q310 80 325 105 L340 150 Z"
        fill={color}
      />
      <path
        d="M120 100 L140 82 L260 82 L280 100 Z"
        fill="white"
        opacity="0.35"
      />
      <rect x="55" y="140" width="290" height="22" rx="6" fill={color} />
      <circle cx="115" cy="165" r="24" fill="#1f2937" />
      <circle cx="115" cy="165" r="10" fill="#9ca3af" />
      <circle cx="285" cy="165" r="24" fill="#1f2937" />
      <circle cx="285" cy="165" r="10" fill="#9ca3af" />
      <rect x="70" y="118" width="40" height="18" rx="3" fill="#bfdbfe" />
      <rect x="290" y="118" width="40" height="18" rx="3" fill="#bfdbfe" />
    </svg>
  );
}
