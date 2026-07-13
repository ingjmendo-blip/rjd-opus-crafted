import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, MessageCircle, CheckCircle2, Send } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { SITE, whatsappUrl } from "@/lib/site";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | Solicita una Cotización | RJD Group" },
      { name: "description", content: "Solicita una cotización para tu proyecto de ingeniería. Escríbenos por WhatsApp o completa el formulario." },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", service: "Consultoría", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `Hola RJD Group, soy ${form.name}${form.company ? ` (${form.company})` : ""}.\n` +
      `Servicio de interés: ${form.service}.\n` +
      `Correo: ${form.email}${form.phone ? ` · Tel: ${form.phone}` : ""}.\n` +
      `Mensaje: ${form.message}`;
    window.open(whatsappUrl(msg), "_blank");
    setSent(true);
  };

  return (
    <SiteLayout>
      <section className="py-20 md:py-28">
        <div className="container-rjd">
          <SectionHeader
            eyebrow="Contacto"
            title="Solicita una cotización para tu proyecto"
            intro="Cuéntanos sobre tu proyecto y te responderemos con una propuesta técnica y comercial."
            align="center"
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-rjd grid lg:grid-cols-[1fr_1.3fr] gap-8">
          {/* Info */}
          <Reveal>
            <div className="rounded-3xl bg-brand-blue-dark text-white p-8 md:p-10 relative overflow-hidden">
              <div aria-hidden className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
              <div className="relative">
                <h3 className="font-display font-bold text-2xl">Estamos para ayudarte</h3>
                <p className="mt-3 text-white/70">Escoge el canal que prefieras. Respondemos en horas hábiles.</p>

                <ul className="mt-8 space-y-5">
                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-gold shrink-0">
                      <Phone size={18} />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/60">Teléfono</div>
                      <a href={`tel:+51${SITE.phone}`} className="mt-0.5 block font-semibold hover:text-brand-gold">
                        +51 {SITE.phoneDisplay}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-gold shrink-0">
                      <Mail size={18} />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/60">Correo</div>
                      <a href={`mailto:${SITE.email}`} className="mt-0.5 block font-semibold hover:text-brand-gold break-all">
                        {SITE.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-gold shrink-0">
                      <MessageCircle size={18} />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/60">WhatsApp</div>
                      <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="mt-0.5 block font-semibold hover:text-brand-gold">
                        Iniciar conversación
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.05}>
            <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-white p-8 md:p-10 shadow-sm">
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold-soft text-brand-gold">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="mt-5 font-display font-bold text-2xl text-brand-blue-dark">¡Solicitud enviada!</h3>
                  <p className="mt-2 text-brand-grey">Te redirigimos a WhatsApp para completar la conversación con un especialista.</p>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-display font-bold text-2xl text-brand-blue-dark">Formulario de cotización</h3>
                  <p className="mt-2 text-sm text-brand-grey">Completa los datos y te contactaremos por WhatsApp.</p>
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <Field label="Nombre completo" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                    <Field label="Empresa" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                    <Field label="Correo" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <Field label="Teléfono" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-brand-grey">Servicio de interés</label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-brand-ink focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none"
                      >
                        {["Consultoría", "Supervisión", "Construcción", "Mantenimiento", "Topografía", "Alquiler de Maquinaria", "Gestión de Proyectos"].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-brand-grey">Cuéntanos sobre tu proyecto</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-brand-ink focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none resize-none"
                        placeholder="Describe brevemente el alcance, ubicación y plazos estimados..."
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 group inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-blue-dark transition"
                  >
                    Enviar solicitud
                    <Send size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="mt-3 text-xs text-brand-grey">Al enviar, se abrirá WhatsApp con tu mensaje listo para enviar.</p>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-brand-grey">
        {label}
        {required && <span className="text-brand-gold ml-1">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-brand-ink focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none"
      />
    </div>
  );
}
