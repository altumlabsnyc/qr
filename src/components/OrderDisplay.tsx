import { OrderData } from "@/types/OrderData";
import { supabase } from "@/utils/supabase";

export interface OrderDisplayProps {
  order?: OrderData;
  error?: any;
}

export default function OrderDisplay({ order, error }: OrderDisplayProps) {
  console.log(order);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }

  if (!order) {
    return <h1>Order not found</h1>;
  }

  const allAnalyses = order.lot.samples
    .flatMap((sample) => {
      return sample.runs.flatMap((run) => {
        return run.analyses;
      });
    })
    .sort((a, b) => {
      return (
        new Date(a.finished_at).getTime() - new Date(b.finished_at).getTime()
      );
    });

  // choose the analysis with chosen property true or most recent analysis
  let chosenAnalysis = allAnalyses.find((analysis) => analysis.accepted);
  if (!chosenAnalysis) {
    chosenAnalysis = allAnalyses[0];
  }

  console.log("all analyses", allAnalyses);
  console.log("chosen analysis", chosenAnalysis);

  const predictedMoleculeIds = chosenAnalysis.molecule_predictions;

  return (
    <div>
      <h1>Producer Name: some cool brand</h1>
      <p>Pickup date: {order.pickup_date}</p>
      <h2>Analysis: {chosenAnalysis.id}</h2>
      <p>Analysis start time: {chosenAnalysis.started_at}</p>
      <p>Analysis finish time: {chosenAnalysis.finished_at}</p>
      <h3>
        Predicted molecules:
        {predictedMoleculeIds.map((molecule) => (
          <div key={molecule.id}>
            <p>{molecule.molecule_id}</p>
            <p>{molecule.temperature}</p>
            <p>{molecule.concentration}</p>
          </div>
        ))}
      </h3>
    </div>
  );
}
