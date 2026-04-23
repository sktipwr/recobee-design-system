import { fontFamily, fontWeight, fontSize, textStyles } from "@/tokens/typography";
import { colors } from "@/tokens/colors";

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-20">
      <h2 className="text-[16px] font-semibold text-white mb-1">{title}</h2>
      <div className="h-px bg-white/[0.06] mb-4" />
      {children}
    </section>
  );
}

function TypeSpecimen({ label, size, weight, family }: { label: string; size: number; weight: string; family: string }) {
  return (
    <div className="flex items-baseline gap-6 mb-6 pb-4 border-b border-white/[0.04]">
      <div className="w-40 shrink-0">
        <p className="text-[12px] font-mono text-amber-400">{label}</p>
        <p className="text-[11px] font-mono text-zinc-600">{size}px / {weight}</p>
      </div>
      <p style={{ fontSize: `${size}px`, fontWeight: weight as any, fontFamily: family }} className="text-white">
        The quick brown fox jumps over the lazy dog
      </p>
    </div>
  );
}

export default function TypographyPage() {
  return (
    <main className="pl-[220px] px-10 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-white mb-2">Typography</h1>
        <p className="text-[13px] text-zinc-400 max-w-xl">
          RecoBee uses DM Sans across all platforms. The type scale is built around
          5 sizes (10/12/14/16/24px) with Regular and Bold weights.
        </p>
      </div>

      {/* Font Family */}
      <Section title="Font Family" id="font-family">
        <div className="bg-zinc-900/40 rounded-xl border border-white/[0.06] p-6 mb-6">
          <div className="flex items-center gap-8">
            <div className="text-5xl font-bold text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>Aa</div>
            <div>
              <p className="text-white text-[15px] font-semibold">DM Sans</p>
              <p className="text-zinc-500 text-[12px] font-mono">Regular (400) · Medium (500) · Bold (700)</p>
            </div>
          </div>
          <div className="mt-4 text-zinc-400 text-[13px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 !@#$%^&amp;*()
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {Object.entries(fontWeight).map(([key, value]) => (
            <div key={key} className="bg-zinc-900/40 rounded-xl border border-white/[0.06] p-4 text-center">
              <p className="text-2xl text-white mb-2" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: value as any }}>
                DM Sans
              </p>
              <p className="text-[11px] text-zinc-500 font-mono">{key} — {value}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Font Scale */}
      <Section title="Font Scale" id="font-scale">
        <div className="flex gap-6 mb-8">
          {Object.entries(fontSize).map(([key, value]) => (
            <div key={key} className="text-center">
              <p className="text-white font-bold mb-1" style={{ fontSize: `${value}px`, fontFamily: 'DM Sans, sans-serif' }}>Aa</p>
              <p className="text-[10px] text-zinc-600 font-mono">{key}</p>
              <p className="text-[10px] text-zinc-500 font-mono">{value}px</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Body Styles */}
      <Section title="Body Styles (Regular)" id="body-styles">
        <TypeSpecimen label="bodySmall" size={10} weight="400" family="DM Sans, sans-serif" />
        <TypeSpecimen label="bodyMedium" size={12} weight="400" family="DM Sans, sans-serif" />
        <TypeSpecimen label="bodyLarge" size={14} weight="400" family="DM Sans, sans-serif" />
        <TypeSpecimen label="bodyXL" size={16} weight="400" family="DM Sans, sans-serif" />
        <TypeSpecimen label="bodyXXL" size={24} weight="400" family="DM Sans, sans-serif" />
      </Section>

      {/* Header Styles */}
      <Section title="Header Styles (Bold)" id="header-styles">
        <TypeSpecimen label="headerSmall" size={10} weight="700" family="DM Sans, sans-serif" />
        <TypeSpecimen label="headerMedium" size={12} weight="700" family="DM Sans, sans-serif" />
        <TypeSpecimen label="headerLarge" size={14} weight="700" family="DM Sans, sans-serif" />
        <TypeSpecimen label="header" size={16} weight="700" family="DM Sans, sans-serif" />
      </Section>

      {/* Usage in Code */}
      <Section title="Usage" id="usage">
        <div className="bg-zinc-900/40 rounded-xl border border-white/[0.06] p-4 font-mono text-[12px] text-zinc-400">
          <p className="text-zinc-500 mb-2">{"// Import from tokens"}</p>
          <p className="text-amber-300">{"import FontFamily from 'utils/FontFamily';"}</p>
          <p className="text-amber-300 mb-3">{"import CommonStyles from '../../Styles';"}</p>
          <p className="text-zinc-500 mb-2">{"// Use in styles"}</p>
          <p>{"fontFamily: FontFamily.DMSansBold"}</p>
          <p>{"fontSize: 14"}</p>
          <p className="mb-3">{"color: Colors.text"}</p>
          <p className="text-zinc-500 mb-2">{"// Or use predefined styles"}</p>
          <p>{"style={CommonStyles.txtHeaderLarge}"}</p>
          <p>{"style={CommonStyles.txtBodyMedium}"}</p>
        </div>
      </Section>
    </main>
  );
}
