"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mainNav = [
  { href: "/", label: "Overview" },
  { href: "/tokens", label: "Tokens" },
  { href: "/components", label: "Components" },
];

const componentNav = [
  { id: "button", label: "Button" },
  { id: "chip", label: "Chip / Badge" },
  { id: "text-field", label: "TextField" },
  { id: "card", label: "Card" },
  { id: "stat-card", label: "Stat Card" },
  { id: "service-card", label: "Service Card" },
  { id: "score-ring", label: "Score Ring" },
  { id: "score-bar", label: "Score Bar" },
  { id: "status-badge", label: "Status Badge" },
  { id: "funnel", label: "Funnel Bar" },
  { id: "charts", label: "Charts (Chart.js)" },
  { id: "table", label: "Data Table" },
  { id: "avatar", label: "Avatar" },
  { id: "breadcrumbs", label: "Breadcrumbs" },
  { id: "tabs", label: "Tabs" },
  { id: "switch", label: "Switch" },
  { id: "alert", label: "Alert" },
  { id: "dialog", label: "Dialog" },
  { id: "menu", label: "Menu" },
  { id: "tooltip", label: "Tooltip" },
  { id: "progress", label: "Progress" },
  { id: "skeleton", label: "Skeleton" },
  { id: "empty-state", label: "Empty State" },
];

const tokenNav = [
  { id: "surfaces", label: "Surfaces" },
  { id: "text-colors", label: "Text" },
  { id: "accent", label: "Accent" },
  { id: "genre", label: "Genre" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Radius" },
];

export default function DSNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 z-50 h-screen w-56 bg-zinc-950 border-r border-white/[0.04] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-8.625 0V5.625m0 12.75c0 .621.504 1.125 1.125 1.125m17.25-1.125c0 .621-.504 1.125-1.125 1.125m1.125-1.125V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125" />
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-semibold text-white leading-none">RecoBee</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">Design System</p>
          </div>
        </div>
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-5">
        {/* Main pages */}
        <div className="space-y-0.5">
          {mainNav.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all relative ${
                  active
                    ? "bg-amber-500/15 text-amber-300"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3.5 rounded-r-full bg-amber-400" />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Component sub-nav — visible when on /components */}
        {pathname === "/components" && (
          <div>
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium px-3 mb-1.5">Components</p>
            <div className="space-y-px">
              {componentNav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block px-3 py-1 rounded-md text-[12px] text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Token sub-nav — visible when on /tokens */}
        {pathname === "/tokens" && (
          <div>
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium px-3 mb-1.5">Tokens</p>
            <div className="space-y-px">
              {tokenNav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block px-3 py-1 rounded-md text-[12px] text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/[0.04] shrink-0">
        <p className="text-[11px] text-zinc-600">v0.1.0 · MUI + Tailwind</p>
      </div>
    </aside>
  );
}
