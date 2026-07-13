import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Target, Eye, Gem, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CTASection } from "@/components/site/CTASection";
import teamImg from "@/assets/team.jpg";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros | RJD Group" },
      { name: "description", content: "Conoce a RJD Group: equipo, misión y visión detrás de nuestros proyectos de ingeniería en Perú." },
    ],
  }),
  component: Nosotros,
});

const VALUES = [
  { icon: Target, title: "Misión", desc: "Ejecutar proyectos de ingeniería con excelencia técnica, cumpliendo estándares de calidad, seguridad y sostenibilidad." },
  { icon: Eye, title: "Visión", desc: "Ser una empresa referente en consultoría y ejecución de obras en Perú, reconocida por su rigor técnico e innovación." },
  { icon: Gem, title: "Valores", desc: "Integridad, compromiso, precisión, seguridad y cercanía con nuestros clientes en cada etapa." },
];

const PILLARS = [
  "Equipo técnico multidisciplinario con experiencia en obras civiles, industriales y mineras",
  "Cumplimiento estricto de normativa peruana e internacional",
  "Metodología basada en PMI y buenas prácticas de gestión",
  "Trazabilidad total del proyecto: costos, plazos y calidad",
  "Uso de tecnología para topografía, control y supervisión",
  "Comunicación transparente y reportes ejecutivos claros",
];

function Nosotros() {
  return (
    <SiteLayout>
      <section className="py-20 md:py-28">
        <div className="container-rjd grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHeader
              eyebrow="Sobre nosotros"
              title="Ingeniería con propósito, ejecución con precisión."
              intro="RJD Group nace con el compromiso de acompañar a empresas privadas, industrias y entidades públicas en el desarrollo de proyectos de ingeniería confiables, seguros y eficientes."
            />
          </div>
          <Reveal>
            <div className="relative aspect-[5/4] rounded-3xl overflow-hidden border border-border">
              <img src={teamImg} alt="Equipo RJD" className="h-full w-full object-cover" loading="lazy" width={1600} height={1100} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-secondary/40 border-y border-border">
        <div className="container-rjd grid md:grid-cols-3 gap-6">
          {VALUES.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-white p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold-soft text-brand-gold">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 font-display font-bold text-xl text-brand-blue-dark">{title}</h3>
                <p className="mt-2 text-brand-grey leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-rjd">
          <SectionHeader eyebrow="Pilares" title="Lo que nos hace diferentes" />
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-white p-5">
                  <CheckCircle2 size={20} className="text-brand-gold mt-0.5 shrink-0" />
                  <span className="text-brand-ink">{p}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <Link to="/servicios" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark">
              Explora nuestros servicios <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
