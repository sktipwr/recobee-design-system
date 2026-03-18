import { colors } from "@/lib/tokens";

type BadgeVariant = "genre" | "type" | "language" | "runtime" | "neutral" | "accent";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  /** Genre or type key for color lookup — e.g. "Drama", "Feature Film" */
  colorKey?: string;
  size?: BadgeSize;
  className?: string;
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-1.5 py-px text-[10px]",
  md: "px-2 py-0.5 text-caption",
};

export default function Badge({
  label,
  variant = "neutral",
  colorKey,
  size = "md",
  className = "",
}: BadgeProps) {
  let colorClasses = "bg-zinc-800/40 text-zinc-400";

  if (variant === "genre" && colorKey) {
    const gc = colors.genre[colorKey as keyof typeof colors.genre];
    if (gc) colorClasses = `${gc.bg} ${gc.text}`;
  } else if (variant === "type" && colorKey) {
    const tc = colors.type[colorKey as keyof typeof colors.type];
    if (tc) colorClasses = `${tc.bg} ${tc.text}`;
  } else if (variant === "language") {
    colorClasses = "bg-black/50 backdrop-blur-sm text-zinc-300 border border-white/[0.06]";
  } else if (variant === "runtime") {
    colorClasses = "bg-zinc-800/60 text-zinc-500";
  } else if (variant === "accent") {
    colorClasses = "bg-amber-500/15 text-amber-300 border border-amber-500/20";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]} ${colorClasses} ${className}`}
    >
      {label}
    </span>
  );
}
