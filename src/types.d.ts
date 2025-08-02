import type { Database } from "@/database.types";

export type DatabasePainting = Database["public"]["Tables"]["paintings"]["Row"];
export type DatabasePhoto = Database["public"]["Tables"]["photos"]["Row"];

export type Painting = Omit<
  DatabasePainting,
  "created_at" | "id" | "status"
> & {
  photos: Photo[];
};
export type Photo = Omit<DatabasePhoto, "created_at" | "id" | "painting_id">;
