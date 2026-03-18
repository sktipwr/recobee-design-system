import { colors, typography, spacing, radii, shadows, transitions } from "@/lib/tokens";

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="text-heading font-semibold text-white mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Swatch({ name, value, tw, preview }: { name: string; value: string; tw: string; preview: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-16 rounded-button border border-white/[0.06] overflow-hidden flex items-center justify-center">
        {preview}
      </div>
      <div>
        <p className="text-body-sm text-zinc-300 font-medium">{name}</p>
        <p className="text-caption text-zinc-600 font-mono">{tw}</p>
        <p className="text-caption text-zinc-700 font-mono">{value}</p>
      </div>
    </div>
  );
}

export default function TokensPage() {
  return (
    <main className="px-8 py-10 max-w-4xl space-y-12">
      <div>
        <h1 className="text-heading-lg font-bold text-white">Tokens</h1>
        <p className="text-body text-zinc-400 mt-1">The foundational design decisions that define RecoBee&#39;s visual language.</p>
      </div>

      {/* ─── Colors: Surfaces ─── */}
      <Section title="Surface Colors" id="surfaces">
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(colors.surface).map(([name, { value, tw }]) => (
            <Swatch
              key={name}
              name={name}
              value={value}
              tw={tw}
              preview={<div className="w-full h-full" style={{ backgroundColor: value }} />}
            />
          ))}
        </div>
      </Section>

      {/* ─── Colors: Text ─── */}
      <Section title="Text Colors" id="text-colors">
        <div className="grid grid-cols-5 gap-4">
          {Object.entries(colors.text).map(([name, { value, tw }]) => (
            <div key={name} className="flex flex-col gap-1">
              <p className="text-heading font-semibold" style={{ color: value }}>Aa</p>
              <p className="text-body-sm text-zinc-300 font-medium">{name}</p>
              <p className="text-caption text-zinc-600 font-mono">{tw}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Colors: Accent ─── */}
      <Section title="Accent Colors" id="accent">
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(colors.accent).map(([name, { value, tw }]) => (
            <Swatch
              key={name}
              name={name}
              value={value}
              tw={tw}
              preview={<div className="w-full h-full" style={{ backgroundColor: value }} />}
            />
          ))}
        </div>
      </Section>

      {/* ─── Colors: Genre ─── */}
      <Section title="Genre Colors" id="genre">
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(colors.genre).map(([name, { bg, text }]) => (
            <div key={name} className="flex flex-col gap-2">
              <div className={`h-16 rounded-button flex items-center justify-center ${bg}`}>
                <span className={`text-body font-medium ${text}`}>{name}</span>
              </div>
              <p className="text-caption text-zinc-600 font-mono">{bg}</p>
              <p className="text-caption text-zinc-600 font-mono">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Colors: Type ─── */}
      <Section title="Type Colors" id="type-colors">
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(colors.type).map(([name, { bg, text }]) => (
            <div key={name} className="flex flex-col gap-2">
              <div className={`h-16 rounded-button flex items-center justify-center ${bg}`}>
                <span className={`text-body font-medium ${text}`}>{name}</span>
              </div>
              <p className="text-caption text-zinc-600 font-mono">{bg}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Typography ─── */}
      <Section title="Typography Scale" id="typography">
        <div className="space-y-4 bg-zinc-900/40 rounded-card border border-white/[0.06] p-6">
          {typography.map((t) => (
            <div key={t.name} className="flex items-baseline gap-6 border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
              <div className="w-28 shrink-0">
                <p className="text-body-sm text-zinc-500 font-medium">{t.name}</p>
                <p className="text-caption text-zinc-600 font-mono">{t.size}</p>
              </div>
              <p className={`${t.twClass} text-white font-medium`}>
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Spacing ─── */}
      <Section title="Spacing Scale" id="spacing">
        <div className="space-y-2.5 bg-zinc-900/40 rounded-card border border-white/[0.06] p-6">
          {spacing.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <span className="text-body-sm text-zinc-500 font-mono w-10 text-right">{s}px</span>
              <div className="h-4 rounded-sm bg-amber-500/30" style={{ width: `${s * 3}px` }} />
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Radius ─── */}
      <Section title="Border Radius" id="radius">
        <div className="flex gap-6 flex-wrap">
          {Object.entries(radii).map(([name, { value, tw }]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className={`w-20 h-14 bg-zinc-800 border border-white/[0.06] ${tw}`}
              />
              <p className="text-body-sm text-zinc-300 font-medium">{name}</p>
              <p className="text-caption text-zinc-600 font-mono">{value}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Shadows ─── */}
      <Section title="Shadows" id="shadows">
        <div className="flex gap-6 flex-wrap">
          {Object.entries(shadows).map(([name, { tw }]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className={`w-28 h-20 bg-zinc-900/60 rounded-card border border-white/[0.06] ${tw}`} />
              <p className="text-body-sm text-zinc-300 font-medium">{name}</p>
              <p className="text-caption text-zinc-600 font-mono">{tw}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Transitions ─── */}
      <Section title="Transitions" id="transitions">
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(transitions).map(([name, { value, description }]) => (
            <div key={name} className="bg-zinc-900/40 rounded-card border border-white/[0.06] p-4">
              <p className="text-heading-sm font-semibold text-white">{value}</p>
              <p className="text-body-sm text-zinc-400 font-medium mt-0.5">{name}</p>
              <p className="text-caption text-zinc-600 mt-1">{description}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
