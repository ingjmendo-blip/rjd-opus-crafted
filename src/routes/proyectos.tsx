import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Building2 } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CTASection } from "@/components/site/CTASection";
import pClinica from "@/assets/project-clinica.jpg";
import pSteel from "@/assets/project-steel.jpg";
import pCivil from "@/assets/project-civil.jpg";
import pTopo from "@/assets/project-topografia.jpg";

export const Route = createFileRoute("/proyectos")({
  head: () => ({
    meta: [
      { title: "Proyectos | RJD Group" },
      { name: "description", content: "Proyectos ejecutados por RJD Group en sectores clínico, industrial, minero y de infraestructura." },
    ],
  }),
  component: Proyectos,
});

const PROJECTS = [
  { img: pClinica, name: "Remodelación Clínica Yuvis", location: "Trujillo, La Libertad", type: "Obra Civil · Salud", year: "2024" },
  { img: pSteel, name: "Nave Industrial Metálica", location: "Lima, Perú", type: "Estructura Metálica", year: "2024" },
  { img: pCivil, name: "Infraestructura Minera", location: "Ancash, Perú", type: "Obra Civil · Minería", year: "2023" },
  { img: pTopo, name: "Levantamiento Topográfico", location: "Cajamarca, Perú", type: "Topografía · Consultoría", year: "2023" },
];

function Proyectos() {
  return (
    <SiteLayout>
      <section className="py-20 md:py-28">
        <div className="container-rjd">
          <SectionHeader
            eyebrow="Portafolio"
            title="Proyectos que respaldan nuestro trabajo"
            intro="Una selección de obras y servicios ejecutados con precisión técnica en distintos sectores del Perú."
            align="center"
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-rjd grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <article className="group relative overflow-hidden rounded-3xl border border-border bg-white">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.img} alt={p.name} loading="lazy" width={1200} height={900} className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-brand-gold mb-2">{p.type} · {p.year}</div>
                  <h3 className="font-display font-bold text-xl text-brand-blue-dark">{p.name}</h3>
                  <div className="mt-3 flex items-center gap-4 text-sm text-brand-grey">
                    <span className="inline-flex items-center gap-1.5"><MapPin size={14} className="text-brand-gold" />{p.location}</span>
                    <span className="inline-flex items-center gap-1.5"><Building2 size={14} className="text-brand-gold" />{p.type.split("·")[0]}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
