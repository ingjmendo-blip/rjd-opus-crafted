import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from "lucide-react";
import { Logo } from "./Logo";
import { SITE, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-brand-ink text-white/80">
      <div className="container-rjd grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Logo className="h-12 w-12 bg-white p-1" />
            <div className="leading-none">
              <div className="font-display font-bold text-white text-lg">RJD GROUP</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-brand-gold mt-1">
                Ingeniería & Obras
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/60 max-w-xs">
            Consultoría, supervisión y ejecución de obras de ingeniería con altos
            estándares de calidad y seguridad.
          </p>
          <div className="mt-5 flex gap-3">
            {[Linkedin, Facebook, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Red social"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 hover:border-brand-gold hover:text-brand-gold transition"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">
            Servicios
          </h4>
          <ul className="space-y-2.5 text-sm">
            {["Consultoría", "Supervisión", "Construcción", "Mantenimiento", "Topografía", "Gestión de Proyectos"].map(
              (s) => (
                <li key={s}>
                  <Link to="/servicios" className="hover:text-brand-gold transition-colors">
                    {s}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">
            Empresa
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/nosotros" className="hover:text-brand-gold">Nosotros</Link></li>
            <li><Link to="/proyectos" className="hover:text-brand-gold">Proyectos</Link></li>
            <li><Link to="/servicios" className="hover:text-brand-gold">Servicios</Link></li>
            <li><Link to="/contacto" className="hover:text-brand-gold">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">
            Contacto
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Phone size={16} className="mt-0.5 text-brand-gold shrink-0" />
              <a href={`tel:+51${SITE.phone}`} className="hover:text-brand-gold">
                +51 {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 text-brand-gold shrink-0" />
              <a href={`mailto:${SITE.email}`} className="hover:text-brand-gold break-all">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 text-brand-gold shrink-0" />
              <span>Perú</span>
            </li>
          </ul>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-white hover:brightness-95"
          >
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-rjd flex flex-col md:flex-row items-center justify-between gap-3 py-5 text-xs text-white/50">
          <span>© {new Date().getFullYear()} RJD Group S.A.C. Todos los derechos reservados.</span>
          <span>Consultoría y ejecución de obras en ingeniería.</span>
        </div>
      </div>
    </footer>
  );
}
