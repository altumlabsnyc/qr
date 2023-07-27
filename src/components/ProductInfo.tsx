import { LabOrder, Metadata } from "@/types/DisplayTypes";

interface Props {
  lab_order: LabOrder;
  metadata: Metadata;
}

/**
 * Component that is displayed at all stages of the lab order.
 * Displays information about the product.
 */
export default function ProductInfo({ lab_order, metadata }: Props) {
  return (
    <div className="flex flex-col item-start text-left m-4">
      <h2 className="m-4">PRODUCT NAME (TODO)</h2>
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3 -ml-4">
          <ul className="list-none font-semibold">
            <li>SKU </li>
            <li>Lab: </li>
            <li>Cultivator: </li>
            <li>Brand: </li>
            <li>Strain: </li>
            <li>Unit Weight: </li>
            <li>Serving Size: </li>
          </ul>
        </div>
        <div className="row-span-3">
          <ul className="list-none">
            <li>#{lab_order.id || "No producer SKU specified"}</li>
            <li>{metadata.lab?.lab_name || "No lab specified"}</li>
            <li>
              {metadata.producer?.common_name || "No cultivator specified"}
            </li>
            <li>{metadata.brand?.name || "No brand specified"}</li>
            <li>{lab_order.strain_info}</li>
            <li>{metadata.batch?.weight} g (TODO)</li>
            <li>114514 mg (TODO)</li>
          </ul>
        </div>
      </div>
      <div>
        {metadata.approved ? (
          <button className="bg-green-500 font-semibold text-white py-3 px-20 border border-green-500 hover:border-transparent rounded-full">
            PASSED
          </button>
        ) : (
          <button className="bg-red-500 font-semibold py-3 px-20 border border-red-500 hover:border-transparent rounded-full">
            NOT PASSED
          </button>
        )}
      </div>
    </div>
  );
}
