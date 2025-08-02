import type { Database } from "@/database.types";

type DatabasePainting = Database["public"]["Tables"]["paintings"]["Row"];
type DatabasePhoto = Database["public"]["Tables"]["photos"]["Row"];

type Painting = Omit<DatabasePainting, "created_at" | "id" | "status"> & {
  photos: Photo[];
};
type Photo = Omit<DatabasePhoto, "created_at" | "id" | "painting_id">;
