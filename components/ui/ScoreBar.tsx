"use client";

interface ScoreBarProps {
  label: string;
  value: number;
  max?: number;
  /** Auto-calculated or override */
  color?: "green" | "amber" | "red" | "blue" | string;
  showValue?: boolean;
  size?: "sm" | "md";
  className?: string;
}

const colorMap: Record<string, string> = {
  green: "#4ade80",
  amber: "#f59e0b",
  red: "#f87171",
  blue: "#60a5fa",
};

function autoColor(value: number, max: number): string {
  const pct = value / max;
  if (pct >= 0.7) return "#4ade80";
  if (pct >= 0.4) return "#f59e0b";
  return "#f87171";
}

export default function ScoreBar({
  label,
  value,
  max = 10,
  color,
  showValue = true,
  size = "md",
  className = "",
}: ScoreBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  const barColor = color ? (colorMap[color] || color) : autoColor(value, max);
  const barH = size === "sm" ? "h-1.5" : "h-2";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`${size === "sm" ? "w-28 text-[11px]" : "w-36 text-[12px]"} text-zinc-400 shrink-0 truncate`}>
        {label}
      </span>
      <div className={`flex-1 bg-zinc-800/50 rounded-full ${barH} overflow-hidden`}>
        <div
          className={`${barH} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
      {showValue && (
        <span className={`${size === "sm" ? "text-[11px] w-8" : "text-[12px] w-10"} text-right font-medium`} style={{ color: barColor }}>
          {value}/{max}
        </span>
      )}
    </div>
  );
}
