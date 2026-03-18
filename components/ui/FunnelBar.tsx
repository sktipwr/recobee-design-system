"use client";

interface FunnelStage {
  label: string;
  value: number;
}

interface FunnelBarProps {
  stages: FunnelStage[];
  max?: number;
  className?: string;
}

export default function FunnelBar({ stages, max, className = "" }: FunnelBarProps) {
  const maxVal = max || Math.max(...stages.map((s) => s.value));

  return (
    <div className={`space-y-3 ${className}`}>
      {stages.map((stage, i) => {
        const pct = (stage.value / maxVal) * 100;
        // Gradient from amber to orange, fading with each stage
        const opacity = 1 - i * 0.15;
        return (
          <div key={stage.label} className="flex items-center gap-3">
            <span className="w-28 text-[12px] text-zinc-400 shrink-0 truncate">{stage.label}</span>
            <div className="flex-1 h-7 bg-zinc-800/30 rounded-lg overflow-hidden">
              <div
                className="h-full rounded-lg flex items-center px-2.5 transition-all duration-700 ease-out"
                style={{
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, rgba(245,158,11,${opacity}), rgba(217,119,6,${opacity * 0.7}))`,
                }}
              >
                <span className="text-[11px] font-medium text-white whitespace-nowrap">{stage.value}%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
