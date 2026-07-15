import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
      <Reveal type="fade">
        <span className="mb-4 inline-block rounded-full border border-nordic/50 bg-midnight/60 px-4 py-1.5 text-xs tracking-[0.22em] text-meteorite uppercase">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-heading text-gradient-silver text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.2}>
          <p className="mt-5 text-meteorite">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
