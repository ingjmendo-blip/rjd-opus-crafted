import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  LogOut, Settings, Wrench, FolderKanban, Users, Loader2, Save,
  Plus, Trash2, ArrowUp, ArrowDown, ImageIcon, Eye, EyeOff, ExternalLink,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/Logo";
import { toast } from "sonner";
import {
  adminListAll,
  checkIsAdmin,
  updateSiteSettings,
  upsertService,
  deleteService,
  upsertProject,
  deleteProject,
  upsertClient,
  deleteClient,
} from "@/lib/admin.functions";
import { uploadSiteAsset } from "@/lib/upload";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Panel de Administración | RJD Group" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

type Tab = "settings" | "services" | "projects" | "clients";

function AdminDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Tab>("settings");

  const checkAdmin = useServerFn(checkIsAdmin);
  const listAll = useServerFn(adminListAll);

  const adminCheck = useQuery({
    queryKey: ["is-admin"],
    queryFn: () => checkAdmin(),
  });

  useEffect(() => {
    if (adminCheck.data && !adminCheck.data.isAdmin) {
      toast.error("Tu cuenta no tiene permisos de administrador.");
    }
  }, [adminCheck.data]);

  const dataQuery = useQuery({
    queryKey: ["admin-all"],
    queryFn: () => listAll(),
    enabled: adminCheck.data?.isAdmin === true,
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    queryClient.clear();
    navigate({ to: "/auth", replace: true });
  };

  if (adminCheck.isLoading) {
    return <FullscreenLoader label="Verificando permisos..." />;
  }

  if (adminCheck.data && !adminCheck.data.isAdmin) {
    return (
      <div className="min-h-dvh grid place-items-center bg-secondary/30 px-4">
        <div className="max-w-md text-center rounded-3xl bg-white border border-border p-10">
          <h1 className="font-display font-bold text-2xl text-brand-blue-dark">Sin acceso</h1>
          <p className="mt-2 text-brand-grey">
            Tu cuenta no tiene el rol de administrador. Contacta al equipo de RJD Group.
          </p>
          <button
            onClick={signOut}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-brand-blue"
          >
            <LogOut size={14} /> Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "settings", label: "Contacto & Sitio", icon: Settings },
    { id: "services", label: "Servicios", icon: Wrench },
    { id: "projects", label: "Proyectos", icon: FolderKanban },
    { id: "clients", label: "Clientes", icon: Users },
  ];

  return (
    <div className="min-h-dvh bg-secondary/20">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <div className="leading-none">
              <div className="font-display font-bold text-brand-blue-dark">Panel RJD</div>
              <div className="text-[10px] uppercase tracking-widest text-brand-gold mt-0.5">
                Administración
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-brand-grey hover:text-brand-blue px-3 py-2"
            >
              Ver sitio <ExternalLink size={14} />
            </a>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-grey hover:text-brand-blue px-3 py-2 rounded-full border border-border"
            >
              <LogOut size={14} /> Salir
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 grid lg:grid-cols-[220px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="space-y-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  active
                    ? "bg-brand-blue text-white"
                    : "text-brand-grey hover:bg-white hover:text-brand-blue"
                }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            );
          })}
        </aside>

        {/* Content */}
        <main>
          {dataQuery.isLoading && <FullscreenLoader label="Cargando contenido..." inline />}
          {dataQuery.data && (
            <>
              {tab === "settings" && <SettingsTab initial={dataQuery.data.settings} />}
              {tab === "services" && <ServicesTab items={dataQuery.data.services} />}
              {tab === "projects" && <ProjectsTab items={dataQuery.data.projects} />}
              {tab === "clients" && <ClientsTab items={dataQuery.data.clients} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function FullscreenLoader({ label, inline }: { label: string; inline?: boolean }) {
  return (
    <div className={`${inline ? "" : "min-h-dvh"} flex items-center justify-center gap-3 text-brand-grey`}>
      <Loader2 className="animate-spin" size={18} /> {label}
    </div>
  );
}

// ==================== SETTINGS TAB ====================
function SettingsTab({ initial }: { initial: any }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(() => ({
    phone: initial?.phone ?? "",
    phone_display: initial?.phone_display ?? "",
    email: initial?.email ?? "",
    whatsapp_message: initial?.whatsapp_message ?? "",
    facebook_url: initial?.facebook_url ?? "",
    instagram_url: initial?.instagram_url ?? "",
    linkedin_url: initial?.linkedin_url ?? "",
    hero_eyebrow: initial?.hero_eyebrow ?? "",
    hero_title: initial?.hero_title ?? "",
    hero_subtitle: initial?.hero_subtitle ?? "",
    hero_image_url: initial?.hero_image_url ?? "",
  }));

  const save = useServerFn(updateSiteSettings);
  const mutation = useMutation({
    mutationFn: () => save({ data: form }),
    onSuccess: () => {
      toast.success("Cambios guardados");
      queryClient.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const [uploading, setUploading] = useState(false);
  const onImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadSiteAsset(file, "hero");
      setForm((f) => ({ ...f, hero_image_url: url }));
      toast.success("Imagen subida");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Section title="Contacto y contenido del sitio">
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Teléfono (con país, sin +)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="51976244498" />
        <Field label="Teléfono visible" value={form.phone_display} onChange={(v) => setForm({ ...form, phone_display: v })} placeholder="976 244 498" />
        <Field label="Correo" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" />
        <Field label="Mensaje inicial WhatsApp" value={form.whatsapp_message} onChange={(v) => setForm({ ...form, whatsapp_message: v })} />
        <Field label="Facebook URL" value={form.facebook_url} onChange={(v) => setForm({ ...form, facebook_url: v })} />
        <Field label="Instagram URL" value={form.instagram_url} onChange={(v) => setForm({ ...form, instagram_url: v })} />
        <Field label="LinkedIn URL" value={form.linkedin_url} onChange={(v) => setForm({ ...form, linkedin_url: v })} />
      </div>

      <h3 className="mt-10 font-display font-bold text-lg text-brand-blue-dark">Sección Hero</h3>
      <div className="grid md:grid-cols-2 gap-5 mt-4">
        <Field label="Eyebrow" value={form.hero_eyebrow} onChange={(v) => setForm({ ...form, hero_eyebrow: v })} />
        <Field label="Título" value={form.hero_title} onChange={(v) => setForm({ ...form, hero_title: v })} />
        <div className="md:col-span-2">
          <Field label="Subtítulo" value={form.hero_subtitle} onChange={(v) => setForm({ ...form, hero_subtitle: v })} textarea />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-brand-grey">
            Imagen del hero
          </label>
          <div className="mt-2 flex items-center gap-4">
            {form.hero_image_url ? (
              <img src={form.hero_image_url} alt="hero" className="h-24 w-24 rounded-lg object-cover border border-border" />
            ) : (
              <div className="h-24 w-24 rounded-lg bg-secondary grid place-items-center text-brand-grey">
                <ImageIcon size={24} />
              </div>
            )}
            <label className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold cursor-pointer hover:border-brand-blue">
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
              {uploading ? "Subiendo..." : form.hero_image_url ? "Cambiar" : "Subir imagen"}
              <input type="file" accept="image/*" onChange={onImage} className="hidden" disabled={uploading} />
            </label>
            {form.hero_image_url && (
              <button
                type="button"
                onClick={() => setForm({ ...form, hero_image_url: "" })}
                className="text-sm text-red-600 hover:underline"
              >
                Quitar
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60"
        >
          {mutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Guardar cambios
        </button>
      </div>
    </Section>
  );
}

// ==================== SERVICES TAB ====================
const ICON_CHOICES = ["Compass", "ClipboardCheck", "Hammer", "Wrench", "Map", "Truck", "Briefcase", "ShieldCheck", "HardHat", "Layers"];

function ServicesTab({ items }: { items: any[] }) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<any | null>(null);
  const upsert = useServerFn(upsertService);
  const del = useServerFn(deleteService);

  const saveMut = useMutation({
    mutationFn: (row: any) => upsert({ data: row }),
    onSuccess: () => {
      toast.success("Servicio guardado");
      setEditing(null);
      queryClient.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Servicio eliminado");
      queryClient.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const reorder = (row: any, delta: number) => {
    saveMut.mutate({ ...row, sort_order: (row.sort_order ?? 0) + delta });
  };

  return (
    <Section
      title="Servicios"
      action={
        <button
          onClick={() =>
            setEditing({ title: "", description: "", icon: "Compass", items: [], sort_order: items.length + 1, is_published: true })
          }
          className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-dark"
        >
          <Plus size={14} /> Nuevo servicio
        </button>
      }
    >
      <div className="space-y-3">
        {items.map((s) => (
          <div key={s.id} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-white">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-brand-grey w-8">{s.sort_order}</span>
                <span className="font-semibold text-brand-blue-dark truncate">{s.title}</span>
                {!s.is_published && (
                  <span className="text-[10px] uppercase tracking-wider bg-brand-grey/10 text-brand-grey px-2 py-0.5 rounded">Oculto</span>
                )}
              </div>
              <p className="text-sm text-brand-grey truncate mt-1">{s.description}</p>
            </div>
            <button onClick={() => reorder(s, -1)} className="p-2 rounded hover:bg-secondary" title="Subir"><ArrowUp size={14} /></button>
            <button onClick={() => reorder(s, 1)} className="p-2 rounded hover:bg-secondary" title="Bajar"><ArrowDown size={14} /></button>
            <button onClick={() => setEditing(s)} className="text-sm font-semibold text-brand-blue hover:underline px-2">Editar</button>
            <button
              onClick={() => {
                if (confirm(`¿Eliminar "${s.title}"?`)) deleteMut.mutate(s.id);
              }}
              className="p-2 rounded hover:bg-red-50 text-red-600"
              title="Eliminar"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {items.length === 0 && <EmptyState label="Aún no hay servicios" />}
      </div>

      {editing && (
        <Modal onClose={() => setEditing(null)} title={editing.id ? "Editar servicio" : "Nuevo servicio"}>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Título" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-grey">Icono</label>
              <select
                value={editing.icon}
                onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue"
              >
                {ICON_CHOICES.map((i) => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <Field label="Descripción" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} textarea />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-grey">
                Sub-ítems (uno por línea)
              </label>
              <textarea
                rows={5}
                value={(editing.items ?? []).join("\n")}
                onChange={(e) =>
                  setEditing({ ...editing, items: e.target.value.split("\n").map((s: string) => s.trim()).filter(Boolean) })
                }
                className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <Field label="Orden" value={String(editing.sort_order ?? 0)} onChange={(v) => setEditing({ ...editing, sort_order: Number(v) || 0 })} />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-grey">Estado</label>
              <button
                type="button"
                onClick={() => setEditing({ ...editing, is_published: !editing.is_published })}
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold"
              >
                {editing.is_published ? <><Eye size={14} /> Publicado</> : <><EyeOff size={14} /> Oculto</>}
              </button>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setEditing(null)} className="px-5 py-2.5 rounded-full text-sm font-semibold text-brand-grey hover:bg-secondary">Cancelar</button>
            <button
              onClick={() => saveMut.mutate(editing)}
              disabled={saveMut.isPending || !editing.title}
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60"
            >
              {saveMut.isPending && <Loader2 size={14} className="animate-spin" />}
              Guardar
            </button>
          </div>
        </Modal>
      )}
    </Section>
  );
}

// ==================== PROJECTS TAB ====================
function ProjectsTab({ items }: { items: any[] }) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<any | null>(null);
  const upsert = useServerFn(upsertProject);
  const del = useServerFn(deleteProject);

  const saveMut = useMutation({
    mutationFn: (row: any) => upsert({ data: row }),
    onSuccess: () => {
      toast.success("Proyecto guardado");
      setEditing(null);
      queryClient.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Proyecto eliminado");
      queryClient.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const [uploading, setUploading] = useState(false);
  const onImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    try {
      const url = await uploadSiteAsset(file, "projects");
      setEditing({ ...editing, image_url: url });
      toast.success("Imagen subida");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Section
      title="Proyectos"
      action={
        <button
          onClick={() =>
            setEditing({ name: "", location: "", project_type: "", year: "", image_url: "", is_featured: false, is_published: true, sort_order: items.length + 1 })
          }
          className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-dark"
        >
          <Plus size={14} /> Nuevo proyecto
        </button>
      }
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((p) => (
          <div key={p.id} className="rounded-xl border border-border bg-white overflow-hidden">
            <div className="aspect-[16/10] bg-secondary">
              {p.image_url ? (
                <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-brand-grey"><ImageIcon size={30} /></div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-semibold text-brand-blue-dark truncate">{p.name}</div>
                  <div className="text-xs text-brand-grey mt-0.5 truncate">{p.location} · {p.year}</div>
                </div>
                {!p.is_published && (
                  <span className="text-[10px] uppercase tracking-wider bg-brand-grey/10 text-brand-grey px-2 py-0.5 rounded shrink-0">Oculto</span>
                )}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button onClick={() => setEditing(p)} className="text-xs font-semibold text-brand-blue hover:underline">Editar</button>
                <button
                  onClick={() => confirm(`¿Eliminar "${p.name}"?`) && deleteMut.mutate(p.id)}
                  className="ml-auto p-1.5 rounded hover:bg-red-50 text-red-600"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <EmptyState label="Aún no hay proyectos" />}
      </div>

      {editing && (
        <Modal onClose={() => setEditing(null)} title={editing.id ? "Editar proyecto" : "Nuevo proyecto"}>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Nombre" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
            <Field label="Ubicación" value={editing.location} onChange={(v) => setEditing({ ...editing, location: v })} />
            <Field label="Tipo (ej. Obra Civil · Salud)" value={editing.project_type} onChange={(v) => setEditing({ ...editing, project_type: v })} />
            <Field label="Año" value={editing.year} onChange={(v) => setEditing({ ...editing, year: v })} />
            <Field label="Orden" value={String(editing.sort_order ?? 0)} onChange={(v) => setEditing({ ...editing, sort_order: Number(v) || 0 })} />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-grey">Destacado / Publicado</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEditing({ ...editing, is_featured: !editing.is_featured })}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold ${editing.is_featured ? "bg-brand-gold-soft border-brand-gold" : "border-border"}`}
                >
                  {editing.is_featured ? "★ Destacado" : "Destacar"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing({ ...editing, is_published: !editing.is_published })}
                  className="rounded-xl border border-border px-4 py-3 text-sm font-semibold"
                >
                  {editing.is_published ? "Publicado" : "Oculto"}
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-grey">Imagen</label>
              <div className="mt-2 flex items-center gap-4">
                {editing.image_url ? (
                  <img src={editing.image_url} alt="preview" className="h-24 w-32 rounded-lg object-cover border border-border" />
                ) : (
                  <div className="h-24 w-32 rounded-lg bg-secondary grid place-items-center text-brand-grey"><ImageIcon size={24} /></div>
                )}
                <label className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold cursor-pointer hover:border-brand-blue">
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
                  {uploading ? "Subiendo..." : editing.image_url ? "Cambiar" : "Subir imagen"}
                  <input type="file" accept="image/*" onChange={onImage} className="hidden" disabled={uploading} />
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setEditing(null)} className="px-5 py-2.5 rounded-full text-sm font-semibold text-brand-grey hover:bg-secondary">Cancelar</button>
            <button
              onClick={() => saveMut.mutate(editing)}
              disabled={saveMut.isPending || !editing.name}
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60"
            >
              {saveMut.isPending && <Loader2 size={14} className="animate-spin" />}
              Guardar
            </button>
          </div>
        </Modal>
      )}
    </Section>
  );
}

// ==================== CLIENTS TAB ====================
function ClientsTab({ items }: { items: any[] }) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<any | null>(null);
  const upsert = useServerFn(upsertClient);
  const del = useServerFn(deleteClient);

  const saveMut = useMutation({
    mutationFn: (row: any) => upsert({ data: row }),
    onSuccess: () => {
      toast.success("Cliente guardado");
      setEditing(null);
      queryClient.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Cliente eliminado");
      queryClient.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const [uploading, setUploading] = useState(false);
  const onLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    try {
      const url = await uploadSiteAsset(file, "clients");
      setEditing({ ...editing, logo_url: url });
      toast.success("Logo subido");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Section
      title="Clientes"
      action={
        <button
          onClick={() => setEditing({ name: "", logo_url: "", is_published: true, sort_order: items.length + 1 })}
          className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-dark"
        >
          <Plus size={14} /> Nuevo cliente
        </button>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((c) => (
          <div key={c.id} className="rounded-xl border border-border bg-white p-4">
            <div className="h-16 bg-secondary/50 rounded-lg grid place-items-center overflow-hidden">
              {c.logo_url ? (
                <img src={c.logo_url} alt={c.name} className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-xs font-semibold text-brand-grey">{c.name}</span>
              )}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm font-medium truncate">{c.name}</div>
              <div className="flex items-center gap-1">
                <button onClick={() => setEditing(c)} className="text-xs text-brand-blue hover:underline">Editar</button>
                <button
                  onClick={() => confirm(`¿Eliminar ${c.name}?`) && deleteMut.mutate(c.id)}
                  className="p-1 rounded hover:bg-red-50 text-red-600"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <EmptyState label="Aún no hay clientes" />}
      </div>

      {editing && (
        <Modal onClose={() => setEditing(null)} title={editing.id ? "Editar cliente" : "Nuevo cliente"}>
          <div className="grid gap-4">
            <Field label="Nombre" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
            <Field label="Orden" value={String(editing.sort_order ?? 0)} onChange={(v) => setEditing({ ...editing, sort_order: Number(v) || 0 })} />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-grey">Logo</label>
              <div className="mt-2 flex items-center gap-4">
                {editing.logo_url ? (
                  <img src={editing.logo_url} alt="logo" className="h-16 w-32 rounded-lg object-contain bg-white border border-border" />
                ) : (
                  <div className="h-16 w-32 rounded-lg bg-secondary grid place-items-center text-brand-grey"><ImageIcon size={20} /></div>
                )}
                <label className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold cursor-pointer hover:border-brand-blue">
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
                  {uploading ? "Subiendo..." : editing.logo_url ? "Cambiar" : "Subir logo"}
                  <input type="file" accept="image/*" onChange={onLogo} className="hidden" disabled={uploading} />
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setEditing(null)} className="px-5 py-2.5 rounded-full text-sm font-semibold text-brand-grey hover:bg-secondary">Cancelar</button>
            <button
              onClick={() => saveMut.mutate(editing)}
              disabled={saveMut.isPending || !editing.name}
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60"
            >
              {saveMut.isPending && <Loader2 size={14} className="animate-spin" />}
              Guardar
            </button>
          </div>
        </Modal>
      )}
    </Section>
  );
}

// ==================== SHARED UI ====================
function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl border border-border p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-brand-blue-dark">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder, textarea,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; textarea?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-brand-grey">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
        />
      )}
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-border w-full max-w-2xl p-6 md:p-8 my-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-xl text-brand-blue-dark">{title}</h3>
          <button onClick={onClose} className="text-brand-grey hover:text-brand-blue text-xl leading-none">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border p-10 text-center text-brand-grey">
      {label}
    </div>
  );
}