import { OrderData } from "@/types/OrderData";

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

  return (
    <div>
      <h1>{order.id}</h1>
      <p>{order.pickup_date}</p>
      <p>{}</p>
    </div>
  );
}
