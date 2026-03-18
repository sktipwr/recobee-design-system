interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
  className?: string;
}

const sizeMap = {
  sm: "px-2 py-0.5 text-caption",
  md: "px-2.5 py-1 text-body-sm",
};

export default function FilterChip({
  label,
  active = false,
  onClick,
  size = "md",
  className = "",
}: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full font-medium transition-all border ${sizeMap[size]} ${
        active
          ? "bg-amber-500/15 text-amber-300 border-amber-500/20"
          : "bg-zinc-800/40 text-zinc-400 border-transparent hover:bg-zinc-800/70 hover:text-zinc-300"
      } ${className}`}
    >
      {label}
    </button>
  );
}
