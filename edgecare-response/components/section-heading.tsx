export function SectionHeading({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return (
    <div className="mb-6 max-w-3xl">
      {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</p> : null}
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">{title}</h1>
      {copy ? <p className="mt-4 text-base leading-7 text-foreground/68">{copy}</p> : null}
    </div>
  );
}
