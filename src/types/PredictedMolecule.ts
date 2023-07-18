import { Database } from "./supabase";

export type PredictedMolecule = {
  temperature: number | null;
  concentration: number | null;
} & Database["public"]["Tables"]["molecule"]["Row"];
