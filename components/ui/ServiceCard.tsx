interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  /** Badge like "Private Beta" or "Launching Soon" */
  badge?: string;
  badgeVariant?: "amber" | "green" | "blue" | "zinc";
  href?: string;
  disabled?: boolean;
  className?: string;
}

const badgeColors: Record<string, string> = {
  amber: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  green: "bg-green-500/15 text-green-400 border-green-500/20",
  blue: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  zinc: "bg-zinc-800/60 text-zinc-400 border-zinc-700",
};

export default function ServiceCard({
  title,
  description,
  icon,
  badge,
  badgeVariant = "amber",
  href = "#",
  disabled = false,
  className = "",
}: ServiceCardProps) {
  const Tag = disabled ? "div" : "a";

  return (
    <Tag
      href={disabled ? undefined : href}
      className={`group relative bg-zinc-900/40 backdrop-blur-sm rounded-card border border-white/[0.06] p-5 flex flex-col transition-all duration-300 ${
        disabled
          ? "opacity-60 cursor-default border-dashed"
          : "hover:border-amber-500/20 hover:bg-zinc-900/70 hover:-translate-y-0.5 cursor-pointer"
      } ${className}`}
    >
      {/* Badge */}
      {badge && (
        <span className={`self-start px-2 py-0.5 rounded-full text-[10px] font-medium border mb-3 ${badgeColors[badgeVariant]}`}>
          {badge}
        </span>
      )}

      {/* Title row */}
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-amber-500">{icon}</span>}
        <h3 className={`text-[15px] font-semibold text-white ${!disabled ? "group-hover:text-amber-300" : ""} transition-colors`}>
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-[13px] text-zinc-400 leading-relaxed flex-1">{description}</p>

      {/* Arrow */}
      {!disabled && (
        <div className="flex justify-end mt-3">
          <svg className="w-5 h-5 text-amber-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      )}
    </Tag>
  );
}
