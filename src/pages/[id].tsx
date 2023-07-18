import OrderDisplay, { OrderDisplayProps } from "@/components/OrderDisplay";
import UIComponent from "@/components/TestDisplay";
import { OrderData } from "@/types/OrderData";
import { supabase } from "@/utils/supabase";

export default function LabOrder({ order, error }: OrderDisplayProps) {
  // return <OrderDisplay order={order} error={error} />;

  const producerInfo = {
    legal_name: "ABC Pharmaceuticals",
    common_name: "ABC Pharma",
    primary_facility_address: "123 Main St, City",
    billing_address: "456 Elm St, City",
    license_type: "Pharmaceutical License",
    license_number: "ABC123",
    contact_phone: "123-456-7890",
  };

  const brandName = "ABC Brand";

  const labOrderInfo = {
    strain_info: "Strain XYZ",
    location: "Lab Location",
    pickup_date: "2023-07-19",
  };

  const moleculeInfo = {
    temperature: 25,
    concentration: 0.1,
    name: "Molecule ABC",
    common_name: "ABC Molecule",
    molecular_weight: 100.0,
    spec_energy: 2.5,
    m_z: 123.45,
    standard_intensity: 0.8,
    retention_time: 5.6,
    melting_point: 50.0,
    boiling_point: 100.0,
    smiles: "CC(=O)OC1=CC=CC=C1C(=O)O",
    chromatography_type: "HPLC",
    molecule_type: "Organic",
    spectrum: "UV-Vis",
  };

  return (
    <div>
      <h1>UI Example</h1>
      <UIComponent
        producerInfo={producerInfo}
        brandName={brandName}
        labOrderInfo={labOrderInfo}
        moleculeInfo={moleculeInfo}
      />
    </div>
  );
}

export async function getStaticProps({
  params,
}: {
  params: { id: string };
}): Promise<{ props: OrderDisplayProps }> {
  const { id } = params;

  const { data, error: orderError } = await supabase
    .from("lab_order")
    .select(
      `
      *,
      lot ( *,
        samples:sample ( *, 
          runs:run ( *,
            analyses:analysis ( *,
              molecule_predictions:molecule_prediction ( * )
            )
          )
        )
      )
    `
    )
    .eq("id", id)
    .single();

  // const analyses = data?.lot?.flatMap((lot) =>
  //   lot.samples.flatMap((sample) => sample.runs.flatMap((run) => run.analyses))
  // )!;

  // Extract molecule_ids from the molecule_predictions
  const moleculeIds = data?.lot?.flatMap((lot) =>
    lot.samples.flatMap((sample) =>
      sample.runs.flatMap((run) =>
        run.analyses.flatMap((analysis) =>
          analysis.molecule_predictions.map(
            (molecule_prediction) => molecule_prediction.molecule_id
          )
        )
      )
    )
  )!; // non-null assertion

  // Fetch corresponding molecules
  // const { data: moleculesData, error: moleculesError } = await supabase
  //   .from("molecule")
  //   .select("*")
  //   .in("id", moleculeIds);

  const orderData = {
    ...data,
    lot: data?.lot[0],
    // molecules: moleculesData,
  } as OrderData | null;

  console.log("orderData", orderData);
  console.log("orderError", orderError);

  if (!orderData) return { props: {} };

  if (orderError) {
    return { props: { error: orderError } };
  }

  // if (moleculesError) {
  //   return { props: { error: moleculesError } };
  // }

  return {
    props: {
      order: orderData,
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  // Determine all possible values for the slug
  // You could fetch these from a database or an API
  // Here, we'll use a mock list of slugs
  const { data, error } = await supabase.from("lab_order").select("id");

  if (!data) return [];

  if (error) {
    console.log("error", error);
    return [];
  }

  const slugs = data.map(({ id }) => id.toString());

  console.log(slugs);

  const myPaths = slugs.map((id) => ({ params: { id } }));

  return {
    paths: myPaths,
    fallback: false, // or 'blocking' for on-demand SSR
  };
}
