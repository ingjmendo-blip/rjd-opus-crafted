import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from "lucide-react";
import { Logo } from "./Logo";
import { whatsappUrl } from "@/lib/site";
import { useSiteSettings } from "@/hooks/use-site-settings";

export function Footer() {
  const s = useSiteSettings();
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
            <a
              href={s.linkedin_url}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 hover:border-brand-gold hover:text-brand-gold transition"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={s.facebook_url}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 hover:border-brand-gold hover:text-brand-gold transition"
            >
              <Facebook size={16} />
            </a>
            <a
              href={s.instagram_url}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 hover:border-brand-gold hover:text-brand-gold transition"
            >
              <Instagram size={16} />
            </a>
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
              <a href={`tel:+${s.phone}`} className="hover:text-brand-gold">
                +51 {s.phone_display}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 text-brand-gold shrink-0" />
              <a href={`mailto:${s.email}`} className="hover:text-brand-gold break-all">
                {s.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 text-brand-gold shrink-0" />
              <span>Perú</span>
            </li>
          </ul>
          <a
            href={whatsappUrl(s.whatsapp_message, s.phone)}
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
