import { LabOrder, Metadata, PredictedMolecule } from "@/types/DisplayTypes"
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded"
import GppBadOutlinedIcon from "@mui/icons-material/GppBadOutlined"
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined"
import Head from "next/head"
import { useState } from "react"
import MoleculePopup from "../MoleculePopup"
import ProductInfo from "../ProductInfo"

export interface OrderDisplayProps {
  metadata: Metadata
  lab_order: LabOrder
  predicted_molecules: PredictedMolecule[]
}

export function concentrationDisplay(
  molecule: PredictedMolecule | null,
  metadata: Metadata
) {
  if (molecule?.concentration && metadata.batch?.serving_size) {
    return (
      molecule?.concentration * metadata.batch?.serving_size +
      "mg • " +
      molecule?.concentration * 100 +
      "%"
    )
  } else {
    return "Concentration not available"
  }
}

export default function OrderDisplay({
  metadata,
  lab_order,
  predicted_molecules,
}: OrderDisplayProps) {
  const [moleculeShown, setMoleculeShown] = useState<PredictedMolecule | null>(
    null
  )

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
          metadata={metadata}
        />
        <ProductInfo metadata={metadata} lab_order={lab_order} />
        <div className="m-3">
          <h2 className="mt-4 mb-2">Ingredients</h2>
          {predicted_molecules.map((predicted_molecule) => (
            <div
              key={predicted_molecule.id}
              className="grid grid-cols-3 gap-2 items-center mb-8 mt-8 cursor-pointer"
              style={{ gridTemplateColumns: "auto 1fr auto" }}
              onClick={() => setMoleculeShown(predicted_molecule)}
            >
              {metadata.approved ? (
                <div>
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 via-green-400 to-green-500 rounded-full flex flex-col items-center justify-center">
                    <center>
                      <GppGoodOutlinedIcon
                        className="fill-white"
                        fontSize="large"
                      />
                    </center>
                  </div>
                </div>
              ) : (
                <div className="pt-5">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-400 via-red-400 to-red-500 rounded-full flex flex-col items-center justify-center">
                    <center>
                      <GppBadOutlinedIcon className="mt-1" fontSize="large" />
                    </center>
                  </div>
                </div>
              )}
              <div className="flex flex-col items-start ml-4 pr-[140px]">
                {" "}
                {/* Changed from items-center to items-start and added flex-col */}
                <div className="font-semibold">
                  {predicted_molecule.common_name}
                </div>
                <div className="text-sm">
                  {concentrationDisplay(predicted_molecule, metadata)}
                </div>
              </div>
              <ArrowForwardIosRoundedIcon />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
