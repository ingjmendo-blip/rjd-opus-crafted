import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  ShieldCheck,
  ClipboardCheck,
  Layers,
  HardHat,
  Compass,
  Hammer,
  Wrench,
  Map,
  Truck,
  Briefcase,
  CheckCircle2,
  Award,
  Users,
  Building2,
  Quote,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CTASection } from "@/components/site/CTASection";
import { CountUp } from "@/components/site/CountUp";
import { whatsappUrl } from "@/lib/site";
import heroImg from "@/assets/hero-engineering.jpg";
import teamImg from "@/assets/team.jpg";
import pClinica from "@/assets/project-clinica.jpg";
import pSteel from "@/assets/project-steel.jpg";
import pCivil from "@/assets/project-civil.jpg";
import pTopo from "@/assets/project-topografia.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RJD Group | Consultoría y Ejecución de Obras de Ingeniería" },
      {
        name: "description",
        content:
          "Consultoría, supervisión y ejecución de obras de ingeniería en Perú. Proyectos con altos estándares de calidad, seguridad y cumplimiento.",
      },
    ],
  }),
  component: Home,
});

const CLIENTS = ["CLINICA YUVIS", "MENDOZA CONSULTORES", "CARBONIA INDUSTRIES", "GRUPO ANDES", "MINERA SUR", "CONSORCIO NORTE"];

const BENEFITS = [
  { icon: Compass, title: "Consultoría Especializada", desc: "Análisis técnico y asesoría estratégica para tomar las mejores decisiones en cada proyecto." },
  { icon: ClipboardCheck, title: "Supervisión Técnica", desc: "Control riguroso de calidad, plazos y seguridad en obra según normativa vigente." },
  { icon: Layers, title: "Gestión Integral", desc: "Coordinación de recursos, cronogramas y presupuestos con visibilidad total del proyecto." },
  { icon: HardHat, title: "Ejecución de Obras", desc: "Construcción con equipos calificados, materiales certificados y estándares internacionales." },
];

const SERVICES = [
  { icon: Compass, title: "Consultoría", desc: "Estudios técnicos, factibilidad y asesoría en ingeniería civil e industrial." },
  { icon: ClipboardCheck, title: "Supervisión", desc: "Supervisión de obras públicas y privadas con control de calidad integral." },
  { icon: Hammer, title: "Construcción", desc: "Ejecución de obras civiles, industriales y estructuras metálicas." },
  { icon: Wrench, title: "Mantenimiento", desc: "Programas de mantenimiento preventivo y correctivo para infraestructura." },
  { icon: Map, title: "Topografía", desc: "Levantamientos topográficos con equipos de precisión y drones." },
  { icon: Truck, title: "Alquiler de Maquinaria", desc: "Flota de maquinaria pesada y liviana con operadores certificados." },
  { icon: Briefcase, title: "Gestión de Proyectos", desc: "Dirección integral de proyectos bajo metodología PMI." },
];

const STEPS = [
  { n: "01", title: "Diagnóstico", desc: "Evaluación técnica y de requerimientos del proyecto." },
  { n: "02", title: "Planificación", desc: "Cronograma, presupuesto y estrategia de ejecución." },
  { n: "03", title: "Diseño", desc: "Ingeniería de detalle y validación técnica." },
  { n: "04", title: "Ejecución", desc: "Obra con supervisión y control permanente." },
  { n: "05", title: "Entrega", desc: "Cierre, documentación y garantía de calidad." },
];

const STATS = [
  { icon: Building2, end: 150, suffix: "+", label: "Proyectos" },
  { icon: Users, end: 30, suffix: "+", label: "Clientes" },
  { icon: Award, end: 10, suffix: "+", label: "Años" },
  { icon: ShieldCheck, end: 100, suffix: "%", label: "Compromiso" },
];

const PROJECTS = [
  { img: pClinica, name: "Remodelación Clínica Yuvis", location: "Trujillo, La Libertad", type: "Obra Civil / Salud" },
  { img: pSteel, name: "Nave Industrial Metálica", location: "Lima, Perú", type: "Estructura Metálica" },
  { img: pCivil, name: "Infraestructura Minera", location: "Ancash, Perú", type: "Obra Civil / Minería" },
  { img: pTopo, name: "Levantamiento Topográfico", location: "Cajamarca, Perú", type: "Topografía / Consultoría" },
];

const TESTIMONIALS = [
  { name: "Dr. Luis Mendoza", company: "Clínica Yuvis", quote: "RJD Group ejecutó la remodelación de nuestra clínica cumpliendo plazos y con un acabado impecable. Un equipo altamente profesional." },
  { name: "Carlos Mendoza", company: "Mendoza Consultores", quote: "Su capacidad técnica y organización nos dio la tranquilidad de trabajar con un aliado serio y comprometido." },
  { name: "Ana García", company: "Carbonia Industries SAC", quote: "La supervisión y control de calidad fueron ejemplares. Recomendamos ampliamente sus servicios." },
];

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <Clients />
      <About />
      <Benefits />
      <Services />
      <Process />
      <Stats />
      <Projects />
      <Testimonials />
      <CTASection />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* subtle geometric background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 10%, oklch(0.51 0.055 253 / 0.08), transparent 45%), radial-gradient(circle at 85% 90%, oklch(0.66 0.128 82 / 0.06), transparent 40%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.51 0.055 253 / 0.06) 1px, transparent 1px), linear-gradient(90deg, oklch(0.51 0.055 253 / 0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />
      <div className="container-rjd grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-10 pb-20 md:pt-16 md:pb-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-brand-blue"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
            Ingeniería · Consultoría · Obras
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-4xl md:text-5xl lg:text-[56px] font-bold text-brand-blue-dark leading-[1.05] text-balance-rjd"
          >
            Construimos soluciones de ingeniería que{" "}
            <span className="relative inline-block">
              <span className="relative z-10">impulsan tu proyecto</span>
              <span className="absolute inset-x-0 bottom-1 h-2 bg-brand-gold/30 -z-0" />
            </span>
            .
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-base md:text-lg text-brand-grey leading-relaxed max-w-xl"
          >
            En RJD Group desarrollamos proyectos de ingeniería, supervisión, consultoría y ejecución de
            obras con altos estándares técnicos, garantizando calidad, seguridad y cumplimiento en cada
            etapa.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/contacto"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-dark hover:shadow-lg"
            >
              Solicitar Cotización
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-sm font-semibold text-brand-blue-dark hover:border-brand-blue transition"
            >
              Hablar por WhatsApp
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex items-center gap-6 text-sm text-brand-grey"
          >
            {[
              { icon: ShieldCheck, label: "Seguridad" },
              { icon: Award, label: "Calidad" },
              { icon: CheckCircle2, label: "Cumplimiento" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={16} className="text-brand-gold" />
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] md:aspect-[5/6] rounded-3xl overflow-hidden shadow-[0_20px_60px_-30px_oklch(0.51_0.055_253/0.35)] border border-border">
            <img
              src={heroImg}
              alt="Ingenieros supervisando obra"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/40 via-transparent to-transparent" />
          </div>
          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="absolute -bottom-6 -left-4 md:-left-8 bg-white rounded-2xl shadow-xl border border-border p-5 max-w-[240px]"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-gold-soft grid place-items-center">
                <Award size={20} className="text-brand-gold" />
              </div>
              <div className="leading-tight">
                <div className="font-display font-bold text-brand-blue-dark text-lg">+10 años</div>
                <div className="text-xs text-brand-grey">de experiencia técnica</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="absolute -top-4 -right-2 md:-right-6 bg-brand-blue text-white rounded-2xl shadow-xl p-5 max-w-[220px]"
          >
            <div className="text-3xl font-display font-bold">+150</div>
            <div className="text-xs uppercase tracking-wider text-white/80 mt-1">proyectos entregados</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section className="py-12 border-y border-border bg-secondary/40">
      <div className="container-rjd">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-brand-grey mb-8">
          Empresas que confían en nosotros
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {CLIENTS.map((c, i) => (
            <Reveal key={c} delay={i * 0.05}>
              <div className="h-14 rounded-lg border border-border bg-white grid place-items-center px-3">
                <span className="text-brand-grey font-display font-semibold text-sm text-center tracking-wide">
                  {c}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" className="py-24 md:py-32">
      <div className="container-rjd grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div className="relative">
            <div className="relative aspect-[5/4] rounded-3xl overflow-hidden border border-border">
              <img src={teamImg} alt="Equipo de ingeniería RJD Group" width={1600} height={1100} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="hidden md:block absolute -bottom-6 -right-6 h-48 w-48 rounded-3xl border border-brand-gold/40 -z-10" />
            <div className="hidden md:block absolute -top-6 -left-6 h-32 w-32 rounded-3xl bg-brand-blue-soft -z-10" />
          </div>
        </Reveal>
        <div>
          <SectionHeader
            eyebrow="Nosotros"
            title="Más que una constructora. Somos tu aliado estratégico."
            intro="RJD Group integra experiencia técnica, planificación y ejecución para desarrollar proyectos que cumplen con los más altos estándares de calidad, seguridad e innovación."
          />
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              "Enfoque técnico y multidisciplinario",
              "Cumplimiento normativo y de seguridad",
              "Transparencia en cada etapa",
              "Compromiso con plazos y presupuestos",
            ].map((t, i) => (
              <Reveal key={t} delay={0.05 * i}>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
                  <CheckCircle2 size={18} className="text-brand-gold mt-0.5 shrink-0" />
                  <span className="text-sm font-medium text-brand-ink">{t}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <Link
              to="/nosotros"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
            >
              Conocer más sobre nosotros
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/40 to-background">
      <div className="container-rjd">
        <SectionHeader
          eyebrow="Nuestro enfoque"
          title="Beneficios de trabajar con RJD Group"
          align="center"
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="group relative h-full rounded-2xl border border-border bg-white p-7 transition-all duration-500 hover:border-brand-blue/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_oklch(0.51_0.055_253/0.4)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold-soft text-brand-gold group-hover:scale-110 transition">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 font-display font-bold text-lg text-brand-blue-dark">{title}</h3>
                <p className="mt-2 text-sm text-brand-grey leading-relaxed">{desc}</p>
                <div className="absolute inset-x-7 bottom-4 h-px bg-gradient-to-r from-brand-gold/50 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="py-24 md:py-32">
      <div className="container-rjd">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeader
            eyebrow="Servicios"
            title="Servicios integrales de ingeniería"
            intro="Cubrimos todas las etapas del ciclo de vida de tu proyecto con un equipo técnico especializado."
          />
          <Reveal>
            <Link
              to="/servicios"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-brand-blue hover:border-brand-blue transition"
            >
              Ver todos los servicios <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <div className="group h-full flex flex-col rounded-2xl border border-border bg-white p-7 transition-all hover:border-brand-blue/40 hover:shadow-lg hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-gold/30 text-brand-gold bg-brand-gold-soft">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <span className="text-[10px] font-mono text-brand-grey/60">0{i + 1}</span>
                </div>
                <h3 className="mt-5 font-display font-bold text-lg text-brand-blue-dark">{title}</h3>
                <p className="mt-2 text-sm text-brand-grey leading-relaxed flex-1">{desc}</p>
                <Link
                  to="/servicios"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue group-hover:text-brand-blue-dark"
                >
                  Conocer más
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="py-24 md:py-32 bg-secondary/40 border-y border-border">
      <div className="container-rjd">
        <SectionHeader eyebrow="Metodología" title="Un proceso claro, predecible y de calidad" align="center" />
        <div className="mt-16 relative">
          <div aria-hidden className="hidden md:block absolute top-8 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="relative text-center">
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-border shadow-sm">
                    <span className="font-display font-bold text-brand-blue text-lg">{s.n}</span>
                    <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-brand-gold" />
                  </div>
                  <h4 className="mt-5 font-display font-bold text-brand-blue-dark">{s.title}</h4>
                  <p className="mt-1.5 text-xs md:text-sm text-brand-grey leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative bg-brand-blue text-white overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <div className="container-rjd relative py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map(({ icon: Icon, end, suffix, label }, i) => (
          <Reveal key={label} delay={i * 0.08}>
            <div className="text-center md:text-left">
              <Icon size={22} className="mx-auto md:mx-0 text-brand-gold" strokeWidth={1.6} />
              <div className="mt-4 font-display font-bold text-4xl md:text-5xl leading-none">
                <CountUp end={end} suffix={suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/70">{label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="proyectos" className="py-24 md:py-32">
      <div className="container-rjd">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Proyectos"
            title="Obras que respaldan nuestro trabajo"
            intro="Una muestra de nuestros proyectos más recientes en sectores clínico, industrial y minero."
          />
          <Reveal>
            <Link to="/proyectos" className="hidden md:inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-brand-blue hover:border-brand-blue transition">
              Ver todos <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className="group relative overflow-hidden rounded-3xl border border-border bg-white">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/85 via-brand-blue-dark/20 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-brand-gold mb-2">{p.type}</div>
                  <h3 className="font-display font-bold text-xl md:text-2xl">{p.name}</h3>
                  <div className="mt-1 text-sm text-white/70">{p.location}</div>
                  <Link
                    to="/proyectos"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white/90 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Ver Proyecto <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-secondary/40 border-y border-border">
      <div className="container-rjd">
        <SectionHeader eyebrow="Testimonios" title="Lo que dicen nuestros clientes" align="center" />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="h-full rounded-2xl border border-border bg-white p-8 relative">
                <Quote size={28} className="text-brand-gold/50 absolute top-6 right-6" />
                <blockquote className="text-brand-ink leading-relaxed">"{t.quote}"</blockquote>
                <figcaption className="mt-6 pt-6 border-t border-border flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-blue text-white grid place-items-center font-display font-bold text-sm">
                    {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="leading-tight">
                    <div className="font-semibold text-brand-blue-dark text-sm">{t.name}</div>
                    <div className="text-xs text-brand-grey">{t.company}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
