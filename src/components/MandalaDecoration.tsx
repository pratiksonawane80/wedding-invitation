"use client";

export default function MandalaDecoration({
  className = "",
  size = 300,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div className="text-[#d4a017] dark:text-[#fccb4e] transition-colors duration-500">
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className={`animate-spin-slow ${className}`}
        style={{ opacity: "var(--mandala-opacity, 0.07)" }}
      >
        <style jsx>{`
          svg {
            --mandala-opacity: 0.07;
          }
          :global(.dark) svg {
            --mandala-opacity: 0.15;
          }
        `}</style>
        {/* Outer ring */}
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 30} 100 100)`}>
            <ellipse
              cx="100"
              cy="30"
              rx="12"
              ry="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </g>
        ))}
        {/* Middle ring */}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`m-${i}`} transform={`rotate(${i * 45} 100 100)`}>
            <ellipse
              cx="100"
              cy="50"
              rx="8"
              ry="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </g>
        ))}
        {/* Inner ring */}
        <circle
          cx="100"
          cy="100"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="100"
          cy="100"
          r="35"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        {/* Center dot */}
        <circle cx="100" cy="100" r="5" fill="currentColor" />
      </svg>
    </div>
  );
}
