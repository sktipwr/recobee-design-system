// ─── RecoBee Design System Tokens ─────────────────────────────
// Canonical source of truth for all design decisions.

export const colors = {
  surface: {
    base:     { value: "#09090b",              tw: "bg-surface-base" },
    primary:  { value: "#09090b",              tw: "bg-zinc-950" },
    elevated: { value: "rgba(24,24,27,0.4)",   tw: "bg-zinc-900/40" },
    hover:    { value: "rgba(24,24,27,0.7)",   tw: "bg-zinc-900/70" },
  },
  border: {
    subtle:   { value: "rgba(255,255,255,0.04)", tw: "border-white/[0.04]" },
    default:  { value: "rgba(255,255,255,0.06)", tw: "border-white/[0.06]" },
    hover:    { value: "rgba(255,255,255,0.14)", tw: "border-white/[0.14]" },
  },
  text: {
    primary:   { value: "#ffffff",  tw: "text-white" },
    secondary: { value: "#e4e4e7",  tw: "text-zinc-200" },
    tertiary:  { value: "#a1a1aa",  tw: "text-zinc-400" },
    muted:     { value: "#71717a",  tw: "text-zinc-500" },
    faint:     { value: "#52525b",  tw: "text-zinc-600" },
  },
  accent: {
    primary: { value: "#f59e0b", tw: "bg-amber-500" },
    bg:      { value: "rgba(245,158,11,0.15)", tw: "bg-amber-500/15" },
    border:  { value: "rgba(245,158,11,0.2)", tw: "border-amber-500/20" },
    text:    { value: "#fcd34d", tw: "text-amber-300" },
  },
  genre: {
    Drama:     { bg: "bg-indigo-500/20",  text: "text-indigo-300" },
    Comedy:    { bg: "bg-amber-500/20",   text: "text-amber-300" },
    Mystery:   { bg: "bg-violet-500/20",  text: "text-violet-300" },
    Adventure: { bg: "bg-emerald-500/20", text: "text-emerald-300" },
  },
  type: {
    "Feature Film": { bg: "bg-sky-500/20",    text: "text-sky-300" },
    "Web Series":   { bg: "bg-rose-500/20",   text: "text-rose-300" },
    "Short Film":   { bg: "bg-teal-500/20",   text: "text-teal-300" },
    Documentary:    { bg: "bg-orange-500/20",  text: "text-orange-300" },
  },
} as const;

export const typography = [
  { name: "caption",    size: "11px", twClass: "text-caption" },
  { name: "body-sm",    size: "12px", twClass: "text-body-sm" },
  { name: "body",       size: "13px", twClass: "text-body" },
  { name: "body-lg",    size: "15px", twClass: "text-body-lg" },
  { name: "heading-sm", size: "16px", twClass: "text-heading-sm" },
  { name: "heading",    size: "20px", twClass: "text-heading" },
  { name: "heading-lg", size: "24px", twClass: "text-heading-lg" },
  { name: "display",    size: "30px", twClass: "text-display" },
] as const;

export const spacing = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64] as const;

export const radii = {
  pill:   { value: "9999px", tw: "rounded-full" },
  card:   { value: "16px",   tw: "rounded-card" },
  button: { value: "12px",   tw: "rounded-button" },
  input:  { value: "9999px", tw: "rounded-full" },
  badge:  { value: "9999px", tw: "rounded-full" },
} as const;

export const shadows = {
  none:      { value: "none",                             tw: "shadow-none" },
  cardHover: { value: "0 12px 48px -12px rgba(0,0,0,0.6)", tw: "shadow-card-hover" },
  glow:      { value: "0 0 24px -6px rgba(245,158,11,0.15)", tw: "shadow-glow" },
} as const;

export const transitions = {
  fast:      { value: "100ms", description: "Press feedback, micro-interactions" },
  default:   { value: "300ms", description: "Standard hover states, color changes" },
  slow:      { value: "500ms", description: "Opacity fades, glow effects" },
  cinematic: { value: "700ms", description: "Image zoom, dramatic reveals" },
} as const;
