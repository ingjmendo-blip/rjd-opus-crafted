import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function requireAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

// -------- Site settings --------
export const updateSiteSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: Record<string, unknown>) => data)
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const allowed = [
      "phone", "phone_display", "email", "whatsapp_message",
      "facebook_url", "instagram_url", "linkedin_url",
      "hero_eyebrow", "hero_title", "hero_subtitle", "hero_image_url",
      "about_intro", "about_image_url",
    ];
    const clean: Record<string, unknown> = {};
    for (const k of allowed) if (k in data) clean[k] = data[k];
    const { error } = await context.supabase.from("site_settings").update(clean).eq("id", 1);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// -------- Services --------
export const upsertService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: any) => data)
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const row = {
      title: String(data.title ?? "").slice(0, 120),
      description: String(data.description ?? "").slice(0, 800),
      icon: String(data.icon ?? "Compass").slice(0, 40),
      items: Array.isArray(data.items) ? data.items.slice(0, 12) : [],
      sort_order: Number(data.sort_order ?? 0),
      is_published: Boolean(data.is_published ?? true),
    };
    if (data.id) {
      const { error } = await context.supabase.from("services").update(row).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await context.supabase.from("services").insert(row);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const deleteService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("services").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// -------- Projects --------
export const upsertProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: any) => data)
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const row = {
      name: String(data.name ?? "").slice(0, 160),
      location: String(data.location ?? "").slice(0, 160),
      project_type: String(data.project_type ?? "").slice(0, 120),
      year: String(data.year ?? "").slice(0, 20),
      image_url: String(data.image_url ?? ""),
      is_featured: Boolean(data.is_featured ?? false),
      sort_order: Number(data.sort_order ?? 0),
      is_published: Boolean(data.is_published ?? true),
    };
    if (data.id) {
      const { error } = await context.supabase.from("projects").update(row).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await context.supabase.from("projects").insert(row);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("projects").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// -------- Clients --------
export const upsertClient = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: any) => data)
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const row = {
      name: String(data.name ?? "").slice(0, 160),
      logo_url: String(data.logo_url ?? ""),
      sort_order: Number(data.sort_order ?? 0),
      is_published: Boolean(data.is_published ?? true),
    };
    if (data.id) {
      const { error } = await context.supabase.from("clients").update(row).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await context.supabase.from("clients").insert(row);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const deleteClient = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("clients").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// -------- Admin listing (includes unpublished) --------
export const adminListAll = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const [settings, services, projects, clients] = await Promise.all([
      context.supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      context.supabase.from("services").select("*").order("sort_order", { ascending: true }),
      context.supabase.from("projects").select("*").order("sort_order", { ascending: true }),
      context.supabase.from("clients").select("*").order("sort_order", { ascending: true }),
    ]);
    return {
      settings: settings.data,
      services: services.data ?? [],
      projects: projects.data ?? [],
      clients: clients.data ?? [],
    };
  });

// -------- Admin: check current user is admin --------
export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error) throw new Error(error.message);
    return { isAdmin: Boolean(data), userId: context.userId };
  });