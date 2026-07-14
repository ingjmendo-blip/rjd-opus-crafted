import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { SiteSettings } from "@/lib/site";
import { SITE_DEFAULTS } from "@/lib/site";

const FALLBACK: SiteSettings = {
  phone: SITE_DEFAULTS.phone,
  phone_display: SITE_DEFAULTS.phoneDisplay,
  email: SITE_DEFAULTS.email,
  whatsapp_message: SITE_DEFAULTS.whatsappMessage,
  facebook_url: SITE_DEFAULTS.facebook_url,
  instagram_url: SITE_DEFAULTS.instagram_url,
  linkedin_url: SITE_DEFAULTS.linkedin_url,
  hero_eyebrow: "",
  hero_title: "",
  hero_subtitle: "",
  hero_image_url: "",
  about_intro: "",
  about_image_url: "",
};

export function useSiteSettings() {
  const { data } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      return (data as SiteSettings | null) ?? FALLBACK;
    },
    staleTime: 60_000,
  });
  return data ?? FALLBACK;
}

export function useServicesPublic() {
  return useQuery({
    queryKey: ["services_public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useProjectsPublic() {
  return useQuery({
    queryKey: ["projects_public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useClientsPublic() {
  return useQuery({
    queryKey: ["clients_public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}