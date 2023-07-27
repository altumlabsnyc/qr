import { Database } from "./supabase";

export type LabOrder = Database["public"]["Tables"]["lab_order"]["Row"];
export type Batch = Database["public"]["Tables"]["batch"]["Row"];
export type Producer = Database["public"]["Tables"]["producer_user"]["Row"];
export type MoleculeWiki = Database["public"]["Tables"]["molecule_wiki"]["Row"];
export type Analysis = Database["public"]["Tables"]["analysis"]["Row"];
export type Lab = Database["public"]["Tables"]["lab_user"]["Row"];

export interface Metadata {
  batch: Batch | null;
  producer: Producer | null;
  lab: Lab | null;
  approved: boolean;
  decision_time: string | null;
}

export type PredictedMolecule = {
  concentration: number | null;
  molecule_wiki: MoleculeWiki | null;
} & Database["public"]["Tables"]["molecule"]["Row"];
