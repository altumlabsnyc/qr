import { Database } from "./supabase";

type LabOrder = Database["public"]["Tables"]["lab_order"]["Row"];
type Lot = Database["public"]["Tables"]["lot"]["Row"];
type Sample = Database["public"]["Tables"]["sample"]["Row"];
type Run = Database["public"]["Tables"]["run"]["Row"];
type Analysis = Database["public"]["Tables"]["analysis"]["Row"];
type MoleculePrediction =
  Database["public"]["Tables"]["molecule_prediction"]["Row"];

export type OrderData = LabOrder & {
  lot: Lot & {
    samples: (Sample & {
      runs: (Run & {
        analyses: (Analysis & {
          molecule_predictions: MoleculePrediction[];
        })[];
      })[];
    })[];
  };
};
