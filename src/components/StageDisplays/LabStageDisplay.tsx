import { LabOrder, Metadata } from "@/types/DisplayTypes";
import Footer from "../Footer";
import ProductInfo from "../ProductInfo";

interface Props {
  metadata: Metadata;
  lab_order: LabOrder;
}

export default function LabStageDisplay({ metadata, lab_order }: Props) {
  return (
    <div className="prose max-w-none text-center leading-normal flex flex-col items-center">
      <ProductInfo metadata={metadata} lab_order={lab_order} />
      <p>Lab stage display</p>
      <Footer />
    </div>
  );
}
