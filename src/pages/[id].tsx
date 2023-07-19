import "@/app/globals.css";
import GeneralError from "@/components/Errors/GeneralError";
import RedFlagError from "@/components/Errors/RedFlagError";
import AnalysisStageDisplay from "@/components/StageDisplays/AnalysisStageDisplay";
import CompleteStageDisplay from "@/components/StageDisplays/CompleteStageDisplay";
import LabStageDisplay from "@/components/StageDisplays/LabStageDisplay";
import { LabOrder, Metadata, PredictedMolecule } from "@/types/DisplayTypes";
import { STAGE } from "@/types/Stage";
import { supabase } from "@/utils/supabase";

interface Props {
  stage: STAGE;
  metadata: Metadata;
  error?: any;
  lab_order?: LabOrder;
  predicted_molecules?: PredictedMolecule[];
}

// this component acts as a switch to control what is rendered
export default function LabOrder({
  stage,
  error,
  metadata,
  lab_order,
  predicted_molecules,
}: Props) {
  if (error) {
    return <GeneralError error={error} />;
  }

  if (stage === STAGE.LAB && lab_order !== undefined) {
    return <LabStageDisplay metadata={metadata} lab_order={lab_order} />;
  }

  if (stage === STAGE.ANALYSIS && lab_order !== undefined) {
    return <AnalysisStageDisplay metadata={metadata} lab_order={lab_order} />;
  }

  if (
    stage === STAGE.COMPLETE &&
    lab_order !== undefined &&
    predicted_molecules !== undefined
  ) {
    return (
      <CompleteStageDisplay
        metadata={metadata}
        lab_order={lab_order}
        predicted_molecules={predicted_molecules}
      />
    );
  }

  // something with the switch failed, throw a general error
  return <RedFlagError />;
}

export async function getStaticProps({
  params,
}: {
  params: { id: string };
}): Promise<{ props: Props }> {
  // get id from route of url
  const { id } = params;

  // fetch raw data from backend. we know this order exists, or else it would
  // never be prerendered.
  const { data, error: orderError } = await supabase
    .from("lab_order")
    .select(
      `
      *,
      analysis ( *,
        run ( *, 
          sample ( *,
            lot ( *,
              batch ( *, 
                brand ( *,
                  producer:producer_user ( * )
                ),
                facility ( * )
              )  
            )
          )
        )
      )
    `
    )
    .eq("id", id)
    .single();

  // console.log(data?.analysis?.run?.sample?.lot?.batch?.brand);

  if (orderError) {
    return {
      props: {
        stage: STAGE.LAB,
        error: orderError,
      },
    };
  }

  // attempt to get brand info. this only works if the
  // producer -> brand -> batch -> lot -> sample -> run -> analysis
  // relationship is maintained
  const lot = data.analysis?.run?.sample?.lot || null;
  const batch = lot?.batch || null;
  const brand = batch?.brand || null;
  const facility = batch?.facility || null;
  const producer = brand?.producer || null;

  const metadata = {
    lot: lot,
    batch: batch,
    brand: brand,
    producer: producer,
    facility: facility,
  } as Metadata;

  // console.log(producer?.facility);

  if (!data?.analysis) {
    return {
      props: {
        stage: STAGE.LAB,
        metadata: metadata,
        lab_order: data as LabOrder,
      },
    };
  }

  // get predicted molecules from analysis
  const analysis = data.analysis;
  const { data: predicted_molecules, error: predicted_molecule_error } =
    await supabase
      .from("molecule_prediction")
      .select(
        `
        *,
        molecule (*)`
      )
      .eq("analysis_id", analysis.id);

  // console.log(predicted_molecules);

  if (predicted_molecule_error) {
    return {
      props: {
        stage: STAGE.ANALYSIS,
        error: predicted_molecule_error,
      },
    };
  }

  if (!predicted_molecules) {
    return {
      props: {
        stage: STAGE.ANALYSIS,
        metadata: metadata,
        lab_order: data as LabOrder,
      },
    };
  }

  const molecules = predicted_molecules.map((predicted_molecule) => ({
    temperature: predicted_molecule.temperature,
    concentration: predicted_molecule.concentration,
    ...predicted_molecule.molecule,
  }));

  if (!molecules) {
    return {
      props: {
        stage: STAGE.ANALYSIS,
        error: "Molecule data not found",
      },
    };
  }

  // if (moleculesError) {
  //   return { props: { error: moleculesError } };
  // }

  return {
    props: {
      stage: STAGE.COMPLETE,
      metadata: metadata,
      lab_order: data as LabOrder,
      // @ts-ignore
      predicted_molecules: molecules,
    },
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
