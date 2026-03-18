"use client";

import { useState } from "react";
import ComponentShowcase from "@/components/ComponentShowcase";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import FilterChip from "@/components/ui/FilterChip";
import SearchInput from "@/components/ui/SearchInput";
import Breadcrumb from "@/components/ui/Breadcrumb";
import EmptyState from "@/components/ui/EmptyState";
import EmptyPoster from "@/components/ui/EmptyPoster";
import Card from "@/components/ui/Card";

export default function ComponentsPage() {
  const [search, setSearch] = useState("");
  const [activeChip, setActiveChip] = useState("All");

  return (
    <main className="px-8 py-10 max-w-5xl space-y-10">
      <div>
        <h1 className="text-heading-lg font-bold text-white">Components</h1>
        <p className="text-body text-zinc-400 mt-1">
          Reusable building blocks with multiple variants, sizes, and states.
        </p>
      </div>

      {/* ─── Badge ─── */}
      <ComponentShowcase name="Badge" description="Semantic labels for genre, type, language, runtime, and accents. Available in sm and md sizes.">
        <div className="space-y-4 w-full">
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">Genre Variants</p>
            <div className="flex flex-wrap gap-2">
              <Badge label="Drama" variant="genre" colorKey="Drama" />
              <Badge label="Comedy" variant="genre" colorKey="Comedy" />
              <Badge label="Mystery" variant="genre" colorKey="Mystery" />
              <Badge label="Adventure" variant="genre" colorKey="Adventure" />
            </div>
          </div>
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">Type Variants</p>
            <div className="flex flex-wrap gap-2">
              <Badge label="Feature Film" variant="type" colorKey="Feature Film" />
              <Badge label="Web Series" variant="type" colorKey="Web Series" />
              <Badge label="Short Film" variant="type" colorKey="Short Film" />
              <Badge label="Documentary" variant="type" colorKey="Documentary" />
            </div>
          </div>
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">Other Variants</p>
            <div className="flex flex-wrap gap-2">
              <Badge label="Hindi" variant="language" />
              <Badge label="English" variant="language" />
              <Badge label="120 min" variant="runtime" />
              <Badge label="Neutral" variant="neutral" />
              <Badge label="Featured" variant="accent" />
            </div>
          </div>
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">Sizes</p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge label="Small" variant="accent" size="sm" />
              <Badge label="Medium (default)" variant="accent" size="md" />
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* ─── Button ─── */}
      <ComponentShowcase name="Button" description="Primary (amber gradient), secondary (zinc), ghost, and danger variants. Three sizes with optional icon.">
        <div className="space-y-4 w-full">
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">Variants</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">Sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">With Icon</p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                }
              >
                Add Project
              </Button>
              <Button
                variant="secondary"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
                }
              >
                Export
              </Button>
            </div>
          </div>
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">States</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Enabled</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="secondary" disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* ─── Avatar ─── */}
      <ComponentShowcase name="Avatar" description="User avatar with initials or image. Four sizes: xs, sm, md, lg.">
        <div className="space-y-4 w-full">
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">Sizes</p>
            <div className="flex items-center gap-3">
              <Avatar initial="R" size="xs" />
              <Avatar initial="R" size="sm" />
              <Avatar initial="R" size="md" />
              <Avatar initial="R" size="lg" />
            </div>
          </div>
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">Different Initials</p>
            <div className="flex items-center gap-2">
              <Avatar initial="A" size="md" />
              <Avatar initial="B" size="md" />
              <Avatar initial="C" size="md" />
              <Avatar initial="D" size="md" />
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* ─── FilterChip ─── */}
      <ComponentShowcase name="FilterChip" description="Toggle chips for filtering content. Active state uses amber accent. Two sizes.">
        <div className="space-y-4 w-full">
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">Interactive Demo</p>
            <div className="flex flex-wrap gap-2">
              {["All", "Drama", "Comedy", "Mystery", "Adventure"].map((g) => (
                <FilterChip key={g} label={g} active={activeChip === g} onClick={() => setActiveChip(g)} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">Sizes</p>
            <div className="flex items-center gap-2">
              <FilterChip label="Small" size="sm" active />
              <FilterChip label="Medium (default)" size="md" active />
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* ─── SearchInput ─── */}
      <ComponentShowcase name="SearchInput" description="Search field with icon, clear button, and amber focus ring. Two sizes.">
        <div className="space-y-4 w-full max-w-md">
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">Default (md)</p>
            <SearchInput value={search} onChange={setSearch} placeholder="Search projects..." />
          </div>
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">Small</p>
            <SearchInput value="" onChange={() => {}} placeholder="Quick search..." size="sm" />
          </div>
        </div>
      </ComponentShowcase>

      {/* ─── Breadcrumb ─── */}
      <ComponentShowcase name="Breadcrumb" description="Navigation breadcrumb trail. Last item renders as current page (non-clickable).">
        <div className="space-y-4 w-full">
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">Two Levels</p>
            <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Projects to Explore" }]} />
          </div>
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-2">Three Levels</p>
            <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Projects to Explore", href: "#" }, { label: "Tu" }]} />
          </div>
        </div>
      </ComponentShowcase>

      {/* ─── EmptyPoster ─── */}
      <ComponentShowcase name="EmptyPoster" description="Genre-specific gradient poster placeholder with organic light blobs and ghost title text.">
        <div className="grid grid-cols-2 gap-4 w-full">
          <EmptyPoster title="Swaraaj" genre="Drama" />
          <EmptyPoster title="Cutting Chai" genre="Comedy" />
          <EmptyPoster title="Happiness" genre="Mystery" />
          <EmptyPoster title="Test Adventure" genre="Adventure" />
        </div>
      </ComponentShowcase>

      {/* ─── EmptyState ─── */}
      <ComponentShowcase name="EmptyState" description="Placeholder for when no content matches. Optional action button. Two sizes.">
        <div className="space-y-6 w-full">
          <div className="bg-zinc-950/50 rounded-button border border-white/[0.04]">
            <EmptyState />
          </div>
          <div className="bg-zinc-950/50 rounded-button border border-white/[0.04]">
            <EmptyState
              size="sm"
              title="No matches"
              description="Adjust your search query."
              action={<Button variant="secondary" size="sm">Clear filters</Button>}
            />
          </div>
        </div>
      </ComponentShowcase>

      {/* ─── Card ─── */}
      <ComponentShowcase name="Card" description="Project card — fully clickable with hover glow, arrow indicator, poster fallback. Default and compact modes.">
        <div className="space-y-4 w-full">
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-3">Default</p>
            <div className="grid grid-cols-2 gap-4">
              <Card
                title="Tu"
                genre="Drama"
                type="Feature Film"
                language="Hindi"
                runTime="120 min"
                cast={["Rahul Navaja", "Rahul Rangari"]}
                logline="Two people once consumed by love, now tied to different partners, learn how to inhabit their marriages."
                publishedAt="21 Nov 2025"
                publishedBy="Rahulk"
              />
              <Card
                title="Happiness"
                genre="Mystery"
                type="Web Series"
                language="Hindi"
                runTime="89 min"
                cast={["Rajkishov Verma"]}
                logline="Once basic needs are fulfilled, a man finds himself trapped in an invisible crisis."
                publishedAt="22 Dec 2025"
                publishedBy="Missunlimited"
              />
            </div>
          </div>
          <div>
            <p className="text-caption text-zinc-500 uppercase tracking-widest mb-3">Compact</p>
            <div className="grid grid-cols-3 gap-3">
              <Card
                title="Cutting Chai Vs Cappuccino"
                genre="Comedy"
                type="Web Series"
                language="Hindi"
                runTime="125 min"
                logline="Two small-town misfits chase urban success."
                compact
              />
              <Card
                title="Hasmukh"
                genre="Mystery"
                type="Feature Film"
                language="Hindi"
                runTime="110 min"
                logline="A burnt-out Mumbai banker accepts a drunken bet to disappear."
                compact
              />
              <Card
                title="Test"
                genre="Adventure"
                type="Short Film"
                language="English"
                logline="This is adventurous movie"
                compact
              />
            </div>
          </div>
        </div>
      </ComponentShowcase>
    </main>
  );
}
