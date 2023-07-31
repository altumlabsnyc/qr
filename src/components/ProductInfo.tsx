import { LabOrder, Metadata } from "@/types/DisplayTypes"
import GppBadOutlinedIcon from "@mui/icons-material/GppBadOutlined"
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined"

interface Props {
  lab_order: LabOrder
  metadata: Metadata
}

function formatTimestampTZ(timestampTZ: string | null) {
  if (timestampTZ === null) {
    return "No timestamp available"
  }
  const date = new Date(timestampTZ)
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const year = date.getFullYear()
  const hour = String(date.getHours()).padStart(2, "0")
  const minute = String(date.getMinutes()).padStart(2, "0")

  return `${month}/${day}/${year} ${hour}:${minute}`
}

/**
 * Component that is displayed at all stages of the lab order.
 * Displays information about the product.
 */
export default function ProductInfo({ lab_order, metadata }: Props) {
  return (
    <div className="flex flex-col item-center text-left ml-4 dark:text-white">
      <h2 className="mt-5 dark:text-white">{metadata.producer?.common_name}</h2>
      <div className="grid grid-rows-6 grid-cols-3 grid-flow-col text-sm">
        <div>SKU </div>
        <div>Lab: </div>
        <div>Cultivator: </div>
        <div>Strain: </div>
        <div>Unit Weight: </div>
        <div>Serving Size: </div>
        <div className="col-span-2">
          #{lab_order.id || "No producer SKU specified"}
        </div>
        <div className="col-span-2">
          {metadata.lab?.lab_name || "No lab specified"}
        </div>
        <div className="col-span-2">
          {metadata.producer?.legal_name || "No cultivator specified"}
        </div>
        <div className="col-span-2">
          {metadata.batch?.strain || "No strain specified"}
        </div>
        <div className="col-span-2">
          {metadata.batch?.unit_weight + " g" || "No unit weight specified"}
        </div>
        <div className="col-span-2">
          {metadata.batch?.serving_size + " mg" || "No serving size specified"}
        </div>
      </div>
      <div className="mt-8">
        {metadata.approved ? (
          <div className="bg-gradient-to-r from-green-400 via-green-400 to-green-500 text-white py-2 px-2 rounded-full inline-block">
            <GppGoodOutlinedIcon className="mr-1" fontSize="large" />
            <span className="font-bold text-sm mr-3 tracking-wider">
              PASSED
            </span>
            <span className="mr-1 text-xs font-semibold tracking-wide">
              {formatTimestampTZ(metadata.decision_time)}
            </span>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-red-400 via-red-400 to-red-500 font-semibold py-3 px-3 rounded-full inline-block">
            <GppBadOutlinedIcon className="mr-1" fontSize="large" />
            <span className="font-bold text-sm mr-3 tracking-wider">
              FAILED
            </span>
            <span className="mr-1 text-xs font-semibold tracking-wide">
              {formatTimestampTZ(metadata.decision_time)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
