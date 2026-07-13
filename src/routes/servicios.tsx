import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, ClipboardCheck, Hammer, Wrench, Map, Truck, Briefcase, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios | RJD Group" },
      { name: "description", content: "Consultoría, supervisión, construcción, mantenimiento, topografía, alquiler de maquinaria y gestión de proyectos." },
    ],
  }),
  component: Servicios,
});

const SERVICES = [
  { icon: Compass, title: "Consultoría", desc: "Estudios técnicos, factibilidad, expedientes técnicos y asesoría estratégica.", items: ["Estudios de factibilidad", "Expedientes técnicos", "Auditoría técnica", "Diagnóstico de infraestructura"] },
  { icon: ClipboardCheck, title: "Supervisión", desc: "Supervisión de obras públicas y privadas con control de calidad e inspección permanente.", items: ["Control de calidad", "Control de plazos", "Seguridad en obra", "Reportes ejecutivos"] },
  { icon: Hammer, title: "Construcción", desc: "Ejecución de obras civiles, industriales, comerciales y estructuras metálicas.", items: ["Obra civil", "Estructuras metálicas", "Acabados premium", "Remodelaciones"] },
  { icon: Wrench, title: "Mantenimiento", desc: "Mantenimiento preventivo y correctivo para infraestructura y activos.", items: ["Preventivo", "Correctivo", "Predictivo", "Contratos anuales"] },
  { icon: Map, title: "Topografía", desc: "Levantamientos topográficos con equipos de precisión y drones georreferenciados.", items: ["Levantamientos", "Replanteos", "Batimetría", "Fotogrametría con drones"] },
  { icon: Truck, title: "Alquiler de Maquinaria", desc: "Flota de maquinaria pesada y liviana con operadores certificados.", items: ["Excavadoras", "Retroexcavadoras", "Volquetes", "Grupos electrógenos"] },
  { icon: Briefcase, title: "Gestión de Proyectos", desc: "Dirección integral de proyectos bajo metodología PMI y buenas prácticas.", items: ["Gerencia de proyecto", "Control de costos", "Cronogramas", "Gestión de riesgos"] },
];

function Servicios() {
  return (
    <SiteLayout>
      <section className="py-20 md:py-28">
        <div className="container-rjd">
          <SectionHeader
            eyebrow="Servicios"
            title="Soluciones integrales de ingeniería y construcción"
            intro="Desde el diagnóstico inicial hasta la puesta en marcha, brindamos servicios técnicos con equipos calificados y estándares internacionales."
            align="center"
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-rjd grid md:grid-cols-2 gap-6">
          {SERVICES.map(({ icon: Icon, title, desc, items }, i) => (
            <Reveal key={title} delay={(i % 4) * 0.05}>
              <article className="group h-full rounded-2xl border border-border bg-white p-8 transition hover:border-brand-blue/40 hover:shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-gold/30 bg-brand-gold-soft text-brand-gold">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <span className="text-xs font-mono text-brand-grey/60">0{i + 1}</span>
                </div>
                <h3 className="mt-5 font-display font-bold text-xl text-brand-blue-dark">{title}</h3>
                <p className="mt-2 text-brand-grey leading-relaxed">{desc}</p>
                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {items.map((it) => (
                    <li key={it} className="text-sm text-brand-ink flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link to="/contacto" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark">
                  Solicitar Cotización <ArrowRight size={14} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
