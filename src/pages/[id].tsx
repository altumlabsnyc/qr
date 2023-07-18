import "@/app/globals.css";
import { PredictedMolecule } from "@/types/PredictedMolecule";
import { STAGE } from "@/types/Stage";
import { supabase } from "@/utils/supabase";

interface Props {
  stage: STAGE;
  error?: any;
  predicted_molecules?: PredictedMolecule[];
}

export default function LabOrder({ stage, error }: Props) {
  if (error) {
    return (
      <div>
        <h1 className="text-red-400">an error has occured</h1>
        <p>{JSON.stringify(error)}</p>
        <p>please contact altum labs for help</p>
      </div>
    );
  }
  // return <OrderDisplay order={order} error={error} />;
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
            lot ( * )
          )
        )
      )
    `
    )
    .eq("id", id)
    .single();

  console.log(data);

  if (orderError) {
    return {
      props: {
        stage: STAGE.LAB,
        error: orderError,
      },
    };
  }

  if (!data?.analysis) {
    return { props: { stage: STAGE.LAB } };
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

  console.log(predicted_molecules);

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
