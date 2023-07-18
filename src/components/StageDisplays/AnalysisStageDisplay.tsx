import { LabOrder, Metadata } from "@/types/DisplayTypes";

interface Props {
  metadata: Metadata;
  lab_order: LabOrder;
}

export default function AnalysisStageDisplay({ metadata, lab_order }: Props) {
  return (
    <>
      <p>analysis stage display</p>
    </>
  );
}
