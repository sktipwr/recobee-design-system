const gradients: Record<string, string> = {
  Drama: "from-indigo-900/80 via-purple-950/60 to-zinc-950",
  Comedy: "from-amber-900/70 via-orange-950/50 to-zinc-950",
  Mystery: "from-violet-900/80 via-fuchsia-950/50 to-zinc-950",
  Adventure: "from-emerald-900/70 via-teal-950/50 to-zinc-950",
};

interface EmptyPosterProps {
  title: string;
  genre?: string;
  /** Aspect ratio class — defaults to aspect-video (16:9) */
  aspect?: string;
  className?: string;
}

export default function EmptyPoster({
  title,
  genre,
  aspect = "aspect-video",
  className = "",
}: EmptyPosterProps) {
  const grad = (genre && gradients[genre]) || "from-zinc-800 via-zinc-900 to-zinc-950";

  return (
    <div className={`relative ${aspect} bg-gradient-to-br ${grad} overflow-hidden rounded-card ${className}`}>
      {/* Organic light blobs */}
      <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/[0.03] blur-2xl" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/[0.04] blur-xl" />
      <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-white/[0.02] blur-2xl" />

      {/* Ghost title */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <span className="text-heading-lg font-bold text-white/[0.06] text-center leading-tight select-none">
          {title}
        </span>
      </div>
    </div>
  );
}
