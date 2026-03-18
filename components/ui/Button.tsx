import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-amber-400 to-orange-500 text-white font-medium hover:brightness-110 hover:shadow-glow",
  secondary:
    "bg-zinc-800 text-zinc-200 border border-white/[0.06] hover:bg-zinc-700 hover:text-white hover:border-white/[0.1]",
  ghost:
    "bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]",
  danger:
    "bg-red-500/15 text-red-400 border border-red-500/20 hover:bg-red-500/25 hover:text-red-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-body-sm gap-1.5",
  md: "px-4 py-2 text-body gap-2",
  lg: "px-5 py-2.5 text-body-lg gap-2",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-button font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-40 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
