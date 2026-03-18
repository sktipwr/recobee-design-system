import Badge from "./Badge";
import EmptyPoster from "./EmptyPoster";

interface CardProps {
  title: string;
  genre: string;
  type: string;
  language: string;
  runTime?: string;
  cast?: string[];
  logline?: string;
  posterUrl?: string | null;
  publishedAt?: string;
  publishedBy?: string;
  /** Clickable card links to this href */
  href?: string;
  /** Compact mode: smaller padding, tighter spacing */
  compact?: boolean;
  className?: string;
}

export default function Card({
  title,
  genre,
  type,
  language,
  runTime,
  cast = [],
  logline,
  posterUrl,
  publishedAt,
  publishedBy,
  href = "#",
  compact = false,
  className = "",
}: CardProps) {
  const dedupedCast = Array.from(new Set(cast));

  return (
    <a
      href={href}
      className={`group relative bg-zinc-900/40 backdrop-blur-sm rounded-card border border-white/[0.06] overflow-hidden transition-all duration-300 hover:border-white/[0.14] hover:bg-zinc-900/70 hover:shadow-card-hover hover:-translate-y-1 flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${className}`}
    >
      {/* Poster */}
      <div className="relative aspect-video overflow-hidden bg-zinc-900">
        {posterUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url(${posterUrl})` }}
          />
        ) : (
          <div className="absolute inset-0">
            <EmptyPoster title={title} genre={genre} aspect="" className="rounded-none h-full w-full" />
          </div>
        )}
        {/* Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5">
          <Badge label={language} variant="language" size={compact ? "sm" : "md"} />
        </div>
        <div className="absolute top-2.5 right-2.5">
          <Badge label={type} variant="type" colorKey={type} size={compact ? "sm" : "md"} />
        </div>

        {/* Title on poster */}
        <div className="absolute inset-x-0 bottom-0 px-3.5 pb-2.5">
          <h3 className={`font-semibold text-white leading-snug drop-shadow-lg ${compact ? "text-body" : "text-body-lg"}`}>
            {title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 flex flex-col gap-1.5 ${compact ? "p-2.5 pt-2" : "p-3.5 pt-2.5"}`}>
        {logline && (
          <p className={`text-zinc-400 leading-relaxed line-clamp-2 group-hover:text-zinc-300 transition-colors duration-300 ${compact ? "text-body-sm" : "text-body"}`}>
            {logline}
          </p>
        )}

        {dedupedCast.length > 0 && (
          <p className="text-body-sm text-zinc-500 truncate">
            <span className="text-zinc-600">Cast</span> {dedupedCast.join(", ")}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-1.5 mt-1 pt-2 border-t border-white/[0.04]">
          <Badge label={genre} variant="genre" colorKey={genre} size={compact ? "sm" : "md"} />
          {runTime && <Badge label={runTime} variant="runtime" size={compact ? "sm" : "md"} />}
          <div className="flex-1" />
          {/* Arrow */}
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/[0.04] group-hover:bg-amber-500/20 transition-all duration-300 shrink-0">
            <svg className="w-3.5 h-3.5 text-zinc-600 group-hover:text-amber-400 transition-all duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>

        {/* Published */}
        {(publishedAt || publishedBy) && (
          <div className="flex items-center justify-between text-caption text-zinc-600 mt-0.5">
            {publishedAt && <span>{publishedAt}</span>}
            {publishedBy && <span>by {publishedBy}</span>}
          </div>
        )}
      </div>
    </a>
  );
}
