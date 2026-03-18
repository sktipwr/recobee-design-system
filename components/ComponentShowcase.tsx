interface ShowcaseProps {
  name: string;
  description: string;
  children: React.ReactNode;
}

export default function ComponentShowcase({ name, description, children }: ShowcaseProps) {
  return (
    <section id={name.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-8">
      <div className="mb-3">
        <h2 className="text-heading font-semibold text-white">{name}</h2>
        <p className="text-body text-zinc-400 mt-0.5">{description}</p>
      </div>
      <div className="bg-zinc-900/40 backdrop-blur-sm rounded-card border border-white/[0.06] p-6">
        <div className="flex flex-wrap gap-4 items-center">
          {children}
        </div>
      </div>
    </section>
  );
}
