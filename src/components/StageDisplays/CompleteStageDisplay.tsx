import { LabOrder, Metadata, PredictedMolecule } from "@/types/DisplayTypes";
import { useState } from "react";
import MoleculePopup from "../MoleculePopup";
import ProductInfo from "../ProductInfo";
import QRCodeWithForegroundLogo from "../QRCodeWithForegroundLogo";

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
    <div className="prose max-w-none text-center leading-normal flex flex-col items-center">
      <MoleculePopup
        molecule={moleculeShown}
        setMoleculeShown={setMoleculeShown}
      />
      <ProductInfo metadata={metadata} lab_order={lab_order} />
      <div className="flex gap-8 ">
        <QRCodeWithForegroundLogo
          text={`https://qr.plantalysis.com/${lab_order.id}`}
          logoSrc="/logoPretty.svg"
        />
        {/* <QRCodeWithBackgroundLogo
          text={`https://qr.plantalysis.com/${lab_order.id}`}
          logoSrc="/logoThick.svg"
        /> */}
      </div>
      {predicted_molecules.map((predicted_molecule) => (
        <div>
          {/* <p>Temperature: {predicted_molecule.temperature}</p> */}
          <p>Concentration: {predicted_molecule.concentration}</p>
          <p
            className="text-green-400 underline cursor-pointer"
            onClick={() => setMoleculeShown(predicted_molecule)}
          >
            Name: {predicted_molecule.name}
          </p>
          <p>Common Name: {predicted_molecule.common_name}</p>
          {/* <p>Molecular Weight: {predicted_molecule.molecular_weight}</p> */}
          {/* <p>Spec Energy: {predicted_molecule.spec_energy}</p> */}
          {/* <p>m/z: {predicted_molecule["m/z"]}</p> */}
          {/* <p>Standard Intensity: {predicted_molecule.standard_intensity}</p> */}
          {/* <p>Retention Time: {predicted_molecule.retention_time}</p> */}
          {/* <p>Melting Point: {predicted_molecule.melting_point}</p> */}
          {/* <p>Boiling Point: {predicted_molecule.boiling_point}</p> */}
          <p>SMILES: {predicted_molecule.smiles}</p>
          {/* <p>Chromatography Type: {predicted_molecule.chromatography_type}</p> */}
          {/* <p>Spectrum: {predicted_molecule.spectrum}</p> */}
        </div>
      ))}
    </div>
  );
}
