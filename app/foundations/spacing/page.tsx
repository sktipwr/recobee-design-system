import { spacing, borderRadius, figmaBase } from "@/tokens/spacing";

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-20">
      <h2 className="text-[16px] font-semibold text-white mb-1">{title}</h2>
      <div className="h-px bg-white/[0.06] mb-4" />
      {children}
    </section>
  );
}

export default function SpacingPage() {
  return (
    <main className="pl-[220px] px-10 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-white mb-2">Spacing & Layout</h1>
        <p className="text-[13px] text-zinc-400 max-w-xl">
          Consistent spacing creates visual rhythm. RecoBee uses a 4px base grid
          with Figma-referenced responsive scaling.
        </p>
      </div>

      {/* Spacing Scale */}
      <Section title="Spacing Scale" id="spacing-scale">
        <div className="space-y-3">
          {Object.entries(spacing).map(([token, value]) => (
            <div key={token} className="flex items-center gap-4">
              <div className="w-20 text-right">
                <span className="text-[12px] font-mono text-zinc-500">spacing.{token}</span>
              </div>
              <div
                className="h-6 rounded bg-amber-500/80"
                style={{ width: Math.max(value, 2) }}
              />
              <span className="text-[11px] font-mono text-zinc-600">{value}px</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Border Radius */}
      <Section title="Border Radius" id="border-radius">
        <div className="flex gap-6 flex-wrap">
          {Object.entries(borderRadius).map(([token, value]) => (
            <div key={token} className="text-center">
              <div
                className="w-16 h-16 bg-amber-500/80 mb-2"
                style={{ borderRadius: value }}
              />
              <p className="text-[11px] font-mono text-zinc-500">{token}</p>
              <p className="text-[10px] font-mono text-zinc-600">{value}px</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Figma Reference */}
      <Section title="Figma Reference Device" id="figma-reference">
        <div className="bg-zinc-900/40 rounded-xl border border-white/[0.06] p-6">
          <div className="flex gap-8 items-center">
            <div className="w-24 h-40 rounded-xl border-2 border-amber-500/30 flex items-center justify-center">
              <div className="text-center">
                <p className="text-[11px] text-zinc-400 font-mono">{figmaBase.width}</p>
                <p className="text-[10px] text-zinc-600">×</p>
                <p className="text-[11px] text-zinc-400 font-mono">{figmaBase.height}</p>
              </div>
            </div>
            <div>
              <p className="text-white text-[14px] font-semibold mb-2">Base Device</p>
              <p className="text-zinc-400 text-[12px] mb-3">{figmaBase.width}×{figmaBase.height}px — the Figma canvas size used for all designs</p>
              <div className="bg-zinc-900/60 rounded-lg p-3 font-mono text-[11px] text-zinc-500">
                <p className="text-zinc-400 mb-1">{"// Responsive scaling"}</p>
                <p className="text-amber-300">{"scaledWidth(value)"}</p>
                <p className="text-zinc-500">{"= value × (screenWidth / 360)"}</p>
                <p className="text-amber-300 mt-2">{"scaledHeight(value)"}</p>
                <p className="text-zinc-500">{"= value × (screenHeight / 640)"}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Common Spacing Patterns */}
      <Section title="Common Patterns" id="patterns">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900/40 rounded-xl border border-white/[0.06] p-4">
            <p className="text-[12px] text-amber-400 font-semibold mb-2">Card Padding</p>
            <p className="text-[11px] text-zinc-500 font-mono">padding: 12-16px</p>
            <p className="text-[11px] text-zinc-500 font-mono">borderRadius: 10-16px</p>
          </div>
          <div className="bg-zinc-900/40 rounded-xl border border-white/[0.06] p-4">
            <p className="text-[12px] text-amber-400 font-semibold mb-2">Screen Margins</p>
            <p className="text-[11px] text-zinc-500 font-mono">horizontalPadding: 16px</p>
            <p className="text-[11px] text-zinc-500 font-mono">sectionGap: 24px</p>
          </div>
          <div className="bg-zinc-900/40 rounded-xl border border-white/[0.06] p-4">
            <p className="text-[12px] text-amber-400 font-semibold mb-2">List Items</p>
            <p className="text-[11px] text-zinc-500 font-mono">itemGap: 8-12px</p>
            <p className="text-[11px] text-zinc-500 font-mono">iconSize: 18-24px</p>
          </div>
          <div className="bg-zinc-900/40 rounded-xl border border-white/[0.06] p-4">
            <p className="text-[12px] text-amber-400 font-semibold mb-2">Button Heights</p>
            <p className="text-[11px] text-zinc-500 font-mono">small: 32px</p>
            <p className="text-[11px] text-zinc-500 font-mono">medium: 44px</p>
            <p className="text-[11px] text-zinc-500 font-mono">large: 48-52px</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
