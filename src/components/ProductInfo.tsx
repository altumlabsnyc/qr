import { LabOrder, Metadata } from "@/types/DisplayTypes";
import { supabase } from "@/utils/supabase";

interface Props {
  lab_order: LabOrder;
  metadata: Metadata;
}

/**
 * Component that is displayed at all stages of the lab order.
 * Displays information about the product.
 */
export default function ProductInfo({ lab_order, metadata }: Props) {
  const { data } = supabase.storage
    .from("pictures")
    .getPublicUrl(`brand/${metadata.brand?.image_path}`);

  console.log(metadata.approved);

  return (
    <div className="flex flex-col items-center">
      <h1>{metadata.brand?.name || "No brand specified"}</h1>
      <span>SKU: {lab_order.id}</span>
      <span>Batch id: {metadata.batch?.id || "No batch id specified"}</span>
      {/* {data.publicUrl.slice(-9) !== "undefined" ? (
        <img src={data.publicUrl} alt="brand logo" className="w-36 h-36" />
      ) : (
        <p>No brand image specified</p>
      )} */}
      <p>no images yet</p>
      <h2>Producer & Facility info</h2>
      <ul>
        <li>
          Producer:{" "}
          {metadata.producer?.common_name ||
            "No producer common name specified"}
        </li>
        <li>
          Producer Address:{" "}
          {metadata.producer?.primary_facility_address ||
            "No producer address specified"}
        </li>
        <li>
          Producer License:{" "}
          {`${metadata.producer?.license_type}: ${metadata.producer?.license_number}` ||
            "No license"}
        </li>
        <li>
          Facility: {metadata.facility?.name || "No facility name specified"} at{" "}
          {metadata.facility?.location || "No facility location specified"}
        </li>
      </ul>
      <p>Regulator approved: {metadata.approved.toString()}</p>
    </div>
  );
}
