"use client";

interface ScoreRingProps {
  score: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  /** Color auto-calculated from score, or override */
  color?: string;
  label?: string;
  className?: string;
}

const sizeMap = {
  sm: { wh: 64, stroke: 5, fontSize: "text-[16px]", subSize: "text-[9px]" },
  md: { wh: 96, stroke: 6, fontSize: "text-[24px]", subSize: "text-[11px]" },
  lg: { wh: 120, stroke: 7, fontSize: "text-[32px]", subSize: "text-[12px]" },
};

function getScoreColor(score: number, max: number): string {
  const pct = score / max;
  if (pct >= 0.7) return "#4ade80"; // green
  if (pct >= 0.4) return "#f59e0b"; // amber
  return "#f87171"; // red
}

export default function ScoreRing({
  score,
  max = 10,
  size = "md",
  color,
  label,
  className = "",
}: ScoreRingProps) {
  const s = sizeMap[size];
  const radius = (s.wh - s.stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(score / max, 1);
  const dashOffset = circumference * (1 - progress);
  const ringColor = color || getScoreColor(score, max);

  return (
    <div className={`relative inline-flex flex-col items-center gap-1 ${className}`}>
      <svg width={s.wh} height={s.wh} className="-rotate-90">
        {/* Track */}
        <circle
          cx={s.wh / 2}
          cy={s.wh / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={s.stroke}
        />
        {/* Progress */}
        <circle
          cx={s.wh / 2}
          cy={s.wh / 2}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={s.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${s.fontSize} font-bold`} style={{ color: ringColor }}>
          {score}
        </span>
        <span className={`${s.subSize} text-zinc-500`}>/{max}</span>
      </div>
      {label && <span className="text-[11px] text-zinc-500 font-medium">{label}</span>}
    </div>
  );
}
