export const SUPABASE_PUBLIC_HOST =
  "https://vmzkfwmyypbgjyjkvoim.supabase.co";

export function supabasePublicUrl(path: string) {
  const normalized = path.replace(/^\/+/, "");
  return `${SUPABASE_PUBLIC_HOST}/storage/v1/object/public/${normalized}`;
}

