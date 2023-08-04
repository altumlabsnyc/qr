import { LabOrder, Metadata } from "@/types/DisplayTypes";
import Head from "next/head";
import Footer from "../Footer";
import ProductInfo from "../ProductInfo";

interface Props {
  metadata: Metadata;
  lab_order: LabOrder;
}

export default function LabStageDisplay({ metadata, lab_order }: Props) {
  return (
    <>
      <Head>
        <title>Plantalysis by Altum Labs - QR Site</title>
        <meta
          name="description"
          content="Get lab results fast, easy, and transparently."
        />
      </Head>
      <div className="prose max-w-none text-center leading-normal flex flex-col items-center dark:text-white">
        <ProductInfo metadata={metadata} lab_order={lab_order} />
        <p>Lab stage display</p>
        <p>The order requested is currently under lab testing stage</p>
        <Footer />
      </div>
    </>
  );
}
