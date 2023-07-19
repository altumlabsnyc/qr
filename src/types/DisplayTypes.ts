import { Database } from "./supabase";

export type LabOrder = Database["public"]["Tables"]["lab_order"]["Row"];

export type Lot = Database["public"]["Tables"]["lot"]["Row"];
export type Batch = Database["public"]["Tables"]["batch"]["Row"];
export type Brand = Database["public"]["Tables"]["brand"]["Row"];
export type Producer = Database["public"]["Tables"]["producer_user"]["Row"];
export type Facility = Database["public"]["Tables"]["facility"]["Row"];

export interface Metadata {
  // lot: Lot | null;
  batch: Batch | null;
  brand: Brand | null;
  producer: Producer | null;
  facility: Facility | null;
  approved: boolean;
}

export type PredictedMolecule = {
  temperature: number | null;
  concentration: number | null;
} & Database["public"]["Tables"]["molecule"]["Row"];
