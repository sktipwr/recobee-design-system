type AvatarSize = "xs" | "sm" | "md" | "lg";

interface AvatarProps {
  initial: string;
  size?: AvatarSize;
  src?: string;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "w-5 h-5 text-[8px]",
  sm: "w-6 h-6 text-[10px]",
  md: "w-8 h-8 text-body-sm",
  lg: "w-10 h-10 text-body",
};

export default function Avatar({ initial, size = "sm", src, className = "" }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={initial}
        className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold text-white select-none shrink-0 ${className}`}
    >
      {initial.charAt(0).toUpperCase()}
    </div>
  );
}
