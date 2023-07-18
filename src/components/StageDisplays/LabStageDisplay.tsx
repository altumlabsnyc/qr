import { LabOrder, Metadata } from "@/types/DisplayTypes";

interface Props {
  metadata: Metadata;
  lab_order: LabOrder;
}

export default function LabStageDisplay({ metadata, lab_order }: Props) {
  return (
    <>
      <p>Lab stage display</p>
    </>
  );
}
