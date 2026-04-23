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

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  const isLight = hex === "#FFFFFF" || hex === "white" || hex === "#F8F8F9" || hex === "#F5F5F5" || hex === "#EEEEEE";
  return (
    <div className="flex flex-col">
      <div
        className="h-20 rounded-xl border border-white/[0.06]"
        style={{ backgroundColor: hex }}
      />
      <div className="mt-2">
        <p className="text-[12px] font-medium text-zinc-300">{name}</p>
        <p className="text-[11px] text-zinc-600 font-mono">{hex}</p>
      </div>
    </div>
  );
}

function ShadeRow({ shades, label }: { shades: { name: string; hex: string }[]; label?: string }) {
  return (
    <div className="mb-4">
      {label && <p className="text-[11px] text-zinc-500 mb-2">{label}</p>}
      <div className="grid gap-0 rounded-xl overflow-hidden" style={{ gridTemplateColumns: `repeat(${shades.length}, 1fr)` }}>
        {shades.map((s, i) => {
          const isDark = i < shades.length / 2;
          return (
            <div key={s.name} className="h-16 flex flex-col justify-between p-2" style={{ backgroundColor: s.hex }}>
              <p className="text-[9px] font-mono" style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)" }}>{s.name}</p>
              <p className="text-[9px] font-mono" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)" }}>{s.hex}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ColorsPage() {
  return (
    <main className="pl-[220px] px-10 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-white mb-2">Colors</h1>
        <p className="text-[13px] text-zinc-400 max-w-xl">
          Maintaining consistent and engaging digital interfaces demands a well-structured
          and brand-aligned color usage.
        </p>
      </div>

      {/* ─── Primary ─── */}
      <Section title="Primary Color" id="primary-color">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <ColorSwatch name="Primary" hex={colors.primary} />
          <ColorSwatch name="Client Primary" hex={colors.clientPrimary} />
          <ColorSwatch name="Theme BG" hex={colors.themeBg} />
          <ColorSwatch name="White" hex={colors.white} />
        </div>
        <ShadeRow
          label="Gold / Yellow Scale"
          shades={[
            { name: "900", hex: colors.yellowVariant9 },
            { name: "800", hex: colors.yellowVariant8 },
            { name: "Default", hex: colors.clientPrimary },
            { name: "Light", hex: colors.yellow3 },
            { name: "Lighter", hex: colors.yellowVariant2 },
            { name: "Lightest", hex: colors.yellowVariant6 },
          ]}
        />
      </Section>

      {/* ─── Secondary / Black ─── */}
      <Section title="Secondary Colors" id="secondary-colors">
        <ShadeRow
          label="Black"
          shades={[
            { name: "Black", hex: colors.black },
            { name: "Black 3", hex: colors.black3 },
            { name: "Black 4", hex: colors.black4 },
            { name: "Black 5", hex: colors.black5 },
            { name: "Black 6", hex: colors.black6 },
            { name: "Black 7", hex: colors.black7 },
          ]}
        />
      </Section>

      {/* ─── Accent / Status ─── */}
      <Section title="Accent Colors" id="accent-colors">
        <div className="grid grid-cols-4 gap-4">
          <ColorSwatch name="Error" hex={colors.error} />
          <ColorSwatch name="Error Alt" hex={colors.errorAlt} />
          <ColorSwatch name="Success" hex={colors.success} />
          <ColorSwatch name="Success Alt" hex={colors.successAlt} />
        </div>
      </Section>

      {/* ─── Grey ─── */}
      <Section title="Grey Palette" id="grey-palette">
        <ShadeRow
          label="Dark Greys"
          shades={[
            { name: "Grey 10", hex: colors.grey10 },
            { name: "Grey 9", hex: colors.grey9 },
            { name: "Grey 8", hex: colors.grey8 },
            { name: "Grey 7", hex: colors.grey7 },
            { name: "Grey 6", hex: colors.grey6 },
            { name: "Grey 5", hex: colors.grey5 },
          ]}
        />
        <ShadeRow
          label="Light Greys"
          shades={[
            { name: "Grey 4", hex: colors.grey4 },
            { name: "Grey 3", hex: colors.grey3 },
            { name: "Grey 2", hex: colors.grey2 },
            { name: "Grey D4", hex: colors.greyD4 },
            { name: "Grey 15", hex: colors.grey15 },
            { name: "Grey 14", hex: colors.grey14 },
          ]}
        />
      </Section>

      {/* ─── Badges ─── */}
      <Section title="Rank Badge Colors" id="badge-colors">
        <div className="grid grid-cols-4 gap-4">
          <ColorSwatch name="Gold" hex={colors.gold} />
          <ColorSwatch name="Gold 2" hex={colors.gold2} />
          <ColorSwatch name="Silver" hex={colors.silver} />
          <ColorSwatch name="Bronze" hex={colors.bronze} />
        </div>
      </Section>

      {/* ─── Genre ─── */}
      <Section title="Genre / Category Colors" id="genre">
        <div className="grid grid-cols-4 gap-4">
          <ColorSwatch name="Purple" hex={colors.purple} />
          <ColorSwatch name="Teal" hex={colors.teal} />
          <ColorSwatch name="Lime" hex={colors.lime} />
          <ColorSwatch name="Pink" hex={colors.pink} />
          <ColorSwatch name="Orange" hex={colors.orange} />
          <ColorSwatch name="Teal 2" hex={colors.teal2} />
          <ColorSwatch name="Lime 2" hex={colors.lime2} />
          <ColorSwatch name="Purple 2" hex={colors.purple2} />
        </div>
      </Section>
    </main>
  );
}
