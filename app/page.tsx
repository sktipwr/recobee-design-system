import Link from "next/link";

const categories = [
  {
    href: "/tokens",
    title: "Tokens",
    description: "Colors, typography, spacing, radius, shadows, transitions",
    count: "40+",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
      </svg>
    ),
  },
  {
    href: "/components",
    title: "Components",
    description: "Badge, Button, Card, FilterChip, SearchInput, and more",
    count: "9",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
];

export default function OverviewPage() {
  return (
    <main className="px-8 py-10 max-w-4xl">
      {/* Hero */}
      <h1 className="text-display font-bold bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">
        RecoBee Design System
      </h1>
      <p className="text-body-lg text-zinc-400 mt-2 max-w-lg">
        Living style guide and component library for the RecoBee platform.
        Tokens, components, and patterns — all in one place.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[
          { label: "Tokens", value: "40+" },
          { label: "Components", value: "9" },
          { label: "Type Scale Steps", value: "8" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-zinc-900/40 backdrop-blur-sm rounded-card border border-white/[0.06] p-4"
          >
            <p className="text-heading-lg font-bold text-white">{stat.value}</p>
            <p className="text-body-sm text-zinc-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group bg-zinc-900/40 backdrop-blur-sm rounded-card border border-white/[0.06] p-5 transition-all duration-300 hover:border-white/[0.14] hover:bg-zinc-900/70 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-button bg-amber-500/15 flex items-center justify-center text-amber-400">
                {cat.icon}
              </div>
              <span className="text-body-sm text-zinc-600 font-medium">{cat.count}</span>
            </div>
            <h2 className="text-heading-sm font-semibold text-white mt-3 group-hover:text-amber-300 transition-colors">
              {cat.title}
            </h2>
            <p className="text-body text-zinc-500 mt-1">{cat.description}</p>
          </Link>
        ))}
      </div>

      {/* Principles */}
      <div className="mt-12">
        <h2 className="text-heading font-semibold text-white mb-4">Design Principles</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: "Dark-First", desc: "Every surface, every state — designed for dark mode from the ground up." },
            { title: "Glass & Depth", desc: "Translucent surfaces with backdrop-blur create layered depth without heaviness." },
            { title: "Amber Accent", desc: "Threading the brand amber through focus states, active elements, and CTAs." },
          ].map((p) => (
            <div key={p.title} className="border-l-2 border-amber-500/30 pl-4">
              <h3 className="text-body-lg font-medium text-zinc-200">{p.title}</h3>
              <p className="text-body text-zinc-500 mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
