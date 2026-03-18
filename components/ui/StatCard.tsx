interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  /** Color variant for the value */
  variant?: "default" | "accent" | "success" | "warning" | "danger" | "info";
  icon?: React.ReactNode;
  className?: string;
}

const variantColors: Record<string, string> = {
  default: "text-white",
  accent: "text-amber-400",
  success: "text-green-400",
  warning: "text-amber-400",
  danger: "text-red-400",
  info: "text-blue-400",
};

export default function StatCard({
  label,
  value,
  subtitle,
  variant = "default",
  icon,
  className = "",
}: StatCardProps) {
  return (
    <div className={`bg-zinc-900/40 backdrop-blur-sm rounded-card border border-white/[0.06] p-4 transition-all hover:border-white/[0.1] ${className}`}>
      <div className="flex items-start justify-between">
        <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-medium">{label}</span>
        {icon && <span className="text-zinc-600">{icon}</span>}
      </div>
      <p className={`text-[24px] font-bold mt-1 ${variantColors[variant]}`}>{value}</p>
      {subtitle && <p className="text-[12px] text-zinc-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}
