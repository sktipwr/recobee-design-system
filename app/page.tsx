import Link from "next/link";

const sections = [
  {
    href: "/foundations",
    title: "Foundations",
    description: "Colors, typography, spacing, and other foundational design decisions.",
    count: "40+",
    icon: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
      </svg>
    ),
  },
  {
    href: "/tokens",
    title: "Design Tokens",
    description: "Surface colors, text colors, accent palette, genre colors, and raw tokens.",
    count: "40+",
    icon: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    href: "/components",
    title: "Components",
    description: "Reusable UI building blocks — buttons, cards, inputs, badges, and more.",
    count: "22",
    icon: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    href: "/patterns",
    title: "Patterns",
    description: "Common layout patterns, navigation, forms, and interaction guidelines.",
    count: "—",
    icon: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
      </svg>
    ),
  },
];

export default function IntroPage() {
  return (
    <main className="px-12 py-10 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-[28px] font-bold text-white mb-3">RecoBee Design System</h1>
        <p className="text-[14px] text-zinc-400 leading-relaxed max-w-2xl">
          A unified design language for RecoBee&apos;s mobile and web applications.
          This system defines the foundational tokens, reusable components, and interaction patterns
          that create consistent, engaging experiences across all platforms.
        </p>
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-2 gap-5 mb-12">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group block p-5 rounded-2xl border border-white/[0.06] bg-zinc-900/40 hover:border-amber-500/20 hover:bg-zinc-900/70 transition-all hover:shadow-lg hover:shadow-amber-500/5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">{s.icon}</div>
              <h3 className="text-[15px] font-semibold text-white group-hover:text-amber-300 transition-colors">{s.title}</h3>
              <span className="ml-auto text-[11px] text-zinc-600 font-mono">{s.count}</span>
            </div>
            <p className="text-[12px] text-zinc-500 leading-relaxed">{s.description}</p>
          </Link>
        ))}
      </div>

      {/* Brand strip */}
      <div className="rounded-2xl border border-white/[0.06] bg-zinc-900/40 p-5">
        <h2 className="text-[15px] font-semibold text-white mb-4">Brand Identity</h2>
        <div className="flex gap-4">
          <div className="flex-1 bg-[#121212] rounded-xl p-4 text-center border border-white/[0.06]">
            <div className="text-2xl font-bold text-[#E9C638] mb-1">RecoBee</div>
            <div className="text-[11px] text-zinc-500">Dark Theme + Gold Accent</div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-5 gap-2 mb-3">
              <div className="h-10 rounded-lg bg-[#121212] border border-white/[0.06]" title="#121212" />
              <div className="h-10 rounded-lg bg-[#E9C638]" title="#E9C638" />
              <div className="h-10 rounded-lg bg-[#F8F8F9]" title="#F8F8F9" />
              <div className="h-10 rounded-lg bg-[#424242]" title="#424242" />
              <div className="h-10 rounded-lg bg-[#272727]" title="#272727" />
            </div>
            <p className="text-[11px] text-zinc-600">DM Sans — Regular 400 · Medium 500 · Bold 700</p>
          </div>
        </div>
      </div>
    </main>
  );
}
