interface GeometricPatternProps {
  className?: string
  opacity?: number
}

export default function GeometricPattern({
  className = '',
  opacity = 0.07,
}: GeometricPatternProps) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="islamic-star"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(0)"
        >
          <path
            d="M40 0 L48 32 L80 40 L48 48 L40 80 L32 48 L0 40 L32 32 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity={opacity}
          />
          <circle cx="40" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="0.4" opacity={opacity * 0.8} />
          <path
            d="M40 28 L44 36 L52 36 L46 42 L48 50 L40 46 L32 50 L34 42 L28 36 L36 36 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            opacity={opacity * 0.9}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-star)" className="text-gold-400" />
    </svg>
  )
}
