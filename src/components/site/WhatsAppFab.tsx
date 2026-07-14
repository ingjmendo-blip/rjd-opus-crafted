import { whatsappUrl } from "@/lib/site";
import { useSiteSettings } from "@/hooks/use-site-settings";

export function WhatsAppFab() {
  const s = useSiteSettings();
  return (
    <a
      href={whatsappUrl(s.whatsapp_message, s.phone)}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition"
    >
      <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.29c-.28-.14-1.67-.82-1.93-.91-.26-.1-.45-.14-.63.14-.19.28-.72.91-.88 1.1-.16.19-.32.21-.6.07-.28-.14-1.19-.44-2.27-1.4-.84-.75-1.4-1.67-1.57-1.95-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.63-1.51-.86-2.07-.23-.55-.46-.48-.63-.49h-.54c-.19 0-.49.07-.75.35-.26.28-.98.96-.98 2.34s1 2.72 1.14 2.91c.14.19 1.97 3.01 4.78 4.22.67.29 1.19.46 1.59.59.67.21 1.28.18 1.76.11.54-.08 1.67-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33Z" />
        <path d="M27.28 4.75A15.87 15.87 0 0 0 16 0C7.16 0 0 7.16 0 16c0 2.83.74 5.6 2.15 8.04L0 32l8.16-2.14A15.94 15.94 0 0 0 16 32c8.84 0 16-7.16 16-16 0-4.28-1.67-8.3-4.72-11.25ZM16 29.33c-2.5 0-4.94-.67-7.08-1.94l-.51-.3-4.85 1.27 1.29-4.72-.33-.53A13.24 13.24 0 0 1 2.67 16C2.67 8.63 8.63 2.67 16 2.67c3.54 0 6.87 1.38 9.37 3.88a13.2 13.2 0 0 1 3.88 9.37c0 7.37-5.95 13.41-13.25 13.41Z" />
      </svg>
    </a>
  );
}
