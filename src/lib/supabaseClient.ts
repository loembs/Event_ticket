import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const isSecretKey = Boolean(supabaseAnonKey?.startsWith("sb_secret_"));

// Never use secret keys in frontend runtime.
export const hasSupabaseCredentials = Boolean(supabaseUrl && supabaseAnonKey && !isSecretKey);

export const supabase = hasSupabaseCredentials
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
