"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const topNav = [
  { href: "/", label: "Introduction" },
  { href: "/foundations", label: "Foundations" },
  { href: "/tokens", label: "Tokens" },
  { href: "/components", label: "Components" },
  { href: "/patterns", label: "Patterns" },
];

const foundationsSidebar = [
  { id: "colors", label: "Colors", href: "/foundations" },
  { id: "typography", label: "Typography", href: "/foundations/typography" },
  { id: "spacing", label: "Spacing", href: "/foundations/spacing" },
  { id: "layout", label: "Layout", href: "/foundations/layout" },
];

const componentsSidebar = [
  { id: "overview", label: "Overview", href: "/components" },
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
  { id: "charts", label: "Charts" },
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

const tokensSidebar = [
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
  const isFoundations = pathname.startsWith("/foundations");
  const isComponents = pathname.startsWith("/components");
  const isTokens = pathname === "/tokens";

  const showSidebar = isFoundations || isComponents || isTokens;

  const sidebarLabel = isComponents ? "COMPONENTS" : isTokens ? "TOKENS" : "FOUNDATIONS";

  const sidebarItems = isComponents
    ? componentsSidebar
    : isTokens
    ? tokensSidebar
    : isFoundations
    ? foundationsSidebar
    : [];

  return (
    <>
      {/* ── Top Navigation Bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-zinc-950 border-b border-white/[0.06] flex items-center px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mr-8 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">R</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-semibold text-white">RecoBee</span>
            <span className="text-[11px] text-zinc-500 font-medium">Design System</span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center h-full gap-0.5">
          {topNav.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`h-full flex items-center px-3 text-[13px] font-medium transition-colors border-b-2 ${
                  active
                    ? "text-amber-400 border-amber-400"
                    : "text-zinc-500 border-transparent hover:text-zinc-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {/* Storybook external link */}
          <a
            href="http://localhost:6006"
            target="_blank"
            rel="noopener noreferrer"
            className="h-full flex items-center px-3 text-[13px] font-medium text-zinc-500 border-b-2 border-transparent hover:text-zinc-300 gap-1"
          >
            Storybook
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </nav>

        {/* Search */}
        <div className="ml-auto flex items-center gap-2 bg-zinc-900 border border-white/[0.06] rounded-lg px-3 py-1.5 text-[12px] text-zinc-500 w-44">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <span>Search</span>
          <span className="ml-auto text-[10px] border border-zinc-700 rounded px-1 text-zinc-600">⌘K</span>
        </div>
      </header>

      {/* ── Left Sidebar ── */}
      {showSidebar && (
        <aside className="fixed top-14 left-0 z-40 h-[calc(100vh-56px)] w-[220px] bg-zinc-950 border-r border-white/[0.04] overflow-y-auto py-4 px-3">
          {/* Web / Mobile toggle */}
          <div className="flex items-center gap-0.5 mb-5 bg-zinc-900 rounded-lg p-0.5">
            <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[11px] font-medium bg-zinc-800 text-amber-300 border border-white/[0.06]">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
              </svg>
              Web
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[11px] font-medium text-zinc-600">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
              Mobile
            </button>
          </div>

          {/* Section label */}
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold px-2 mb-2">
            {sidebarLabel}
          </p>

          {/* Nav items */}
          <nav className="space-y-0.5">
            {sidebarItems.map((item) => {
              const href: string = "href" in item ? (item as any).href : `#${item.id}`;
              const isPageLink = "href" in item;
              const isActive = isPageLink && (item as any).href === pathname;

              const cls = `block px-2.5 py-1.5 rounded-md text-[12px] transition-colors ${
                isActive
                  ? "text-amber-300 font-semibold bg-amber-500/10"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
              }`;

              return isPageLink ? (
                <Link key={item.id} href={href} className={cls}>
                  {item.label}
                </Link>
              ) : (
                <a key={item.id} href={href} className={cls}>
                  {item.label}
                </a>
              );
            })}
          </nav>
        </aside>
      )}
    </>
  );
}
