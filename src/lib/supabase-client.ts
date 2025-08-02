import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/database.types";
import type { Photo } from "@/types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const getPhotoUrl = (photo: Photo) => {
  const { data } = supabase.storage
    .from("paintings")
    .getPublicUrl(photo.file_path);
  return data.publicUrl;
};
