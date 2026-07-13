import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      {eyebrow && (
        <Reveal>
          <div className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-4 ${align === "center" ? "justify-center" : ""}`}>
            <span className="h-px w-8 bg-brand-gold" />
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-bold text-brand-blue-dark leading-[1.1] text-balance-rjd">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className={`mt-5 text-base md:text-lg text-brand-grey leading-relaxed ${align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
