import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database";

export type SupabaseInstance = SupabaseClient<Database>;

export * from "./database";
