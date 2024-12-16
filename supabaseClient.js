import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

console.log("Iniciando Supabase Client...");
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
console.log("Supabase Client Inicializado");
