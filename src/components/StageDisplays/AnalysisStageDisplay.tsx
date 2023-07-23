import { LabOrder, Metadata } from "@/types/DisplayTypes";
import Head from "next/head";
import Footer from "../Footer";
import ProductInfo from "../ProductInfo";

interface Props {
  metadata: Metadata;
  lab_order: LabOrder;
}

export default function AnalysisStageDisplay({ metadata, lab_order }: Props) {
  return (
    <>
      <Head>
        <title>Plantalysis by Altum Labs - QR Site</title>
        <meta
          name="description"
          content="Get lab results fast, easy, and transparently."
        />
      </Head>
      <div className="prose max-w-none text-center leading-normal flex flex-col items-center">
        <ProductInfo metadata={metadata} lab_order={lab_order} />
        <p>Analysis stage display</p>
        <Footer />
      </div>
    </>
  );
}
