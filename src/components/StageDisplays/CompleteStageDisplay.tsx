import { LabOrder, Metadata, PredictedMolecule } from "@/types/DisplayTypes";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Head from "next/head";
import { useState } from "react";
import MoleculePopup from "../MoleculePopup";
import ProductInfo from "../ProductInfo";

export interface OrderDisplayProps {
  metadata: Metadata;
  lab_order: LabOrder;
  predicted_molecules: PredictedMolecule[];
}

export default function OrderDisplay({
  metadata,
  lab_order,
  predicted_molecules,
}: OrderDisplayProps) {
  const [moleculeShown, setMoleculeShown] = useState<PredictedMolecule | null>(
    null
  );

  return (
    <>
      <Head>
        <title>Plantalysis by Altum Labs - QR Site</title>
        <meta
          name="description"
          content="Get lab results fast, easy, and transparently."
        />
      </Head>
      <div className="prose max-w-none leading-normal flex flex-col items-start text-left m-4">
        <MoleculePopup
          molecule={moleculeShown}
          setMoleculeShown={setMoleculeShown}
        />
        <ProductInfo metadata={metadata} lab_order={lab_order} />
        <div className="flex gap-2"></div>
        <h2>Ingredients</h2>
        {predicted_molecules.map((predicted_molecule) => (
          <div className="grid grid-rows-3 grid-flow-col gap-4">
            <p className="row-span-3">
              {predicted_molecule.name}:{" "}
              {(predicted_molecule.concentration || 0) * 100}%
            </p>
            <button
              className="row-span-3"
              onClick={() => setMoleculeShown(predicted_molecule)}
            >
              <ArrowForwardIosRoundedIcon />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
