import { Database } from "./supabase";

export type LabOrder = Database["public"]["Tables"]["lab_order"]["Row"];
export type Batch = Database["public"]["Tables"]["batch"]["Row"];
export type Producer = Database["public"]["Tables"]["producer_user"]["Row"];
export type MoleculeWiki = Database["public"]["Tables"]["molecule_wiki"]["Row"];
export type Analysis = Database["public"]["Tables"]["analysis"]["Row"];
export type Lab = Database["public"]["Tables"]["lab_user"]["Row"];
export type RegulatorReview =
  Database["public"]["Tables"]["regulator_review"]["Row"];
export type Regulator = Database["public"]["Tables"]["regulator_user"]["Row"];
export type Molecule = Database["public"]["Tables"]["molecule"]["Row"];
export type TestResult = Database["public"]["Tables"]["test_result"]["Row"];
export type TestRequirement =
  Database["public"]["Tables"]["test_requirement"]["Row"];

export interface Metadata {
  batch: Batch | null;
  producer: Producer | null;
  lab: Lab | null;
  review: RegulatorReview | null;
  regulator: Regulator | null;
  results: TestResult[] | null;
  requirements: TestRequirement[] | null;
}

export type PredictedMolecule = {
  concentration: number | null;
  molecule_wiki: MoleculeWiki | null;
} & Molecule;
