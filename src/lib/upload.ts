import { supabase } from "@/integrations/supabase/client";

/**
 * Upload a file to the private site-assets bucket and return a long-lived signed URL
 * (10 years). We save the signed URL directly in the DB so public reads work without
 * per-request signing.
 */
export async function uploadSiteAsset(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error: upErr } = await supabase.storage.from("site-assets").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type,
  });
  if (upErr) throw upErr;
  const { data, error } = await supabase.storage
    .from("site-assets")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 10); // 10 years
  if (error || !data) throw error ?? new Error("No se pudo generar la URL");
  return data.signedUrl;
}