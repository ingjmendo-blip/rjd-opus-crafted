// Fallbacks used only before site_settings loads (SSR / cold cache).
export const SITE_DEFAULTS = {
  phone: "51976244498",
  phoneDisplay: "976 244 498",
  email: "gerencia@rjdgroupsac.com",
  whatsappMessage:
    "Hola RJD Group, quisiera solicitar información sobre sus servicios.",
  facebook_url: "https://www.facebook.com/rjdgroupsac",
  instagram_url: "https://www.instagram.com/rjdgroupsac",
  linkedin_url: "https://www.linkedin.com/company/rjdgroupsac",
};

export type SiteSettings = {
  phone: string;
  phone_display: string;
  email: string;
  whatsapp_message: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string;
  about_intro: string;
  about_image_url: string;
};

export function whatsappUrl(msg?: string, phone = SITE_DEFAULTS.phone) {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    msg ?? SITE_DEFAULTS.whatsappMessage,
  )}`;
}

// Legacy alias so existing imports keep compiling until they migrate to useSite().
export const SITE = {
  phone: SITE_DEFAULTS.phone.replace(/^51/, ""),
  phoneDisplay: SITE_DEFAULTS.phoneDisplay,
  email: SITE_DEFAULTS.email,
};
