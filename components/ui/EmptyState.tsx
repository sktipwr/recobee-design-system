interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  size?: "sm" | "md";
}

export default function EmptyState({
  title = "No results found",
  description = "Try adjusting your filters or search term.",
  icon,
  action,
  size = "md",
}: EmptyStateProps) {
  const defaultIcon = (
    <svg className={`${size === "sm" ? "w-5 h-5" : "w-7 h-7"} text-zinc-600`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );

  return (
    <div className={`flex flex-col items-center justify-center text-center ${size === "sm" ? "py-12" : "py-24"}`}>
      <div className={`${size === "sm" ? "w-10 h-10 rounded-xl" : "w-14 h-14 rounded-2xl"} bg-zinc-800/30 backdrop-blur-sm border border-white/[0.06] flex items-center justify-center mb-3`}>
        {icon || defaultIcon}
      </div>
      <h3 className={`font-medium text-zinc-400 ${size === "sm" ? "text-body" : "text-heading-sm"}`}>{title}</h3>
      <p className={`text-zinc-600 mt-1 max-w-xs ${size === "sm" ? "text-body-sm" : "text-body"}`}>{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
