import { Link } from "@tanstack/react-router";
import { whatsappUrl } from "@/lib/site";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-brand-blue-dark text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, oklch(0.66 0.128 82 / 0.35), transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.51 0.055 253 / 0.7), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="container-rjd relative py-20 md:py-28">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <Reveal>
            <div>
              <div className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-4">
                Trabaja con nosotros
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.05] text-balance-rjd">
                ¿Listo para iniciar tu próximo proyecto de ingeniería?
              </h2>
              <p className="mt-5 text-white/70 text-base md:text-lg max-w-xl leading-relaxed">
                Nuestro equipo está listo para acompañarte desde el diagnóstico hasta la entrega,
                con precisión técnica y compromiso en cada etapa.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
              <Link
                to="/contacto"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-7 py-4 text-sm font-semibold text-white shadow-md hover:brightness-95 transition"
              >
                Solicitar Cotización
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Hablar por WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
