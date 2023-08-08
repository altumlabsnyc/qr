import "@/app/globals.css"
import GeneralError from "@/components/Errors/GeneralError"
import RedFlagError from "@/components/Errors/RedFlagError"
import Footer from "@/components/Footer"
import AnalysisStageDisplay from "@/components/StageDisplays/AnalysisStageDisplay"
import { default as CompleteStageDisplay } from "@/components/StageDisplays/CompleteStageDisplay"
import LabStageDisplay from "@/components/StageDisplays/LabStageDisplay"
import { LabOrder, Metadata, PredictedMolecule } from "@/types/DisplayTypes"
import { STAGE } from "@/types/Stage"
import { supabase } from "@/utils/supabase"

interface Props {
  stage: STAGE
  metadata: Metadata
  error?: any
  lab_order?: LabOrder
  predicted_molecules?: PredictedMolecule[]
}

export default function LabOrderParent({
  stage,
  error,
  metadata,
  lab_order,
  predicted_molecules,
}: Props) {
  return (
    <div className="h-screen dark:bg-black m-0 p-4">
      <LabOrder
        {...{ stage, error, metadata, lab_order, predicted_molecules }}
      />
    </div>
  )
}

// this component acts as a switch to control what is rendered
export function LabOrder({
  stage,
  error,
  metadata,
  lab_order,
  predicted_molecules,
}: Props) {
  if (error) {
    return (
      <>
        <GeneralError error={error} />
        <Footer />
      </>
    )
  }

  if (stage === STAGE.LAB && lab_order !== undefined) {
    return <LabStageDisplay metadata={metadata} lab_order={lab_order} />
  }

  if (stage === STAGE.ANALYSIS && lab_order !== undefined) {
    return <AnalysisStageDisplay metadata={metadata} lab_order={lab_order} />
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
    )
  }

  // something with the switch failed, throw a general error
  return <RedFlagError />
}

export async function getStaticProps({
  params,
}: {
  params: { id: string }
}): Promise<{ props: Props }> {
  // get id from route of url
  const { id } = params

  // fetch raw data from backend. we know this order exists, or else it would
  // never be prerendered.
  const { data: labOrder, error: orderError } = await supabase
    .from("lab_order")
    .select(
      `
      *,
      analysis ( *,
        predicted_molecules:molecule_prediction ( *,
          molecule ( *,
            molecule_wiki ( * )
          )
        ),
        regulator_review ( *,
          regulator:regulator_user ( * )  
        ),
        results:test_result ( *,
          requirement:test_requirement ( * )  
        )
      ),
      batch ( *, 
        producer:producer_user ( * )
      ),
      lab:lab_facility ( * )
    `
    )
    .eq("id", id)
    .single()

  // console.log(labOrder);

  if (orderError) {
    return {
      props: {
        stage: STAGE.LAB,
        error: orderError,
        metadata: {
          batch: null,
          producer: null,
          lab: null,
          review: null,
          regulator: null,
          results: null,
          requirements: null,
        },
      },
    }
  }

  const batch = labOrder?.batch || null;
  const producer = batch?.producer || null;
  const analysis = labOrder?.analysis || null;
  const lab = labOrder?.lab || null;
  const review = analysis?.regulator_review || null;
  const regulator = review?.regulator || null;
  const results = analysis?.results || null;
  const requirements = results?.map((result) => result.requirement) || null;

  // @ts-ignore
  const metadata = {
    batch: batch,
    producer: producer,
    lab: lab,
    review: review,
    regulator: regulator,
    results: results,
    requirements: requirements,
  } as Metadata;

  if (!analysis) {
    return {
      props: {
        stage: STAGE.LAB,
        metadata: metadata,
        lab_order: labOrder as LabOrder,
      },
    }
  }

  const predicted_molecules = analysis.predicted_molecules.map(
    (predicted_molecule) => ({
      concentration: predicted_molecule.concentration,
      molecule_wiki: predicted_molecule.molecule?.molecule_wiki || null,
      ...predicted_molecule.molecule,
    })
  ) as PredictedMolecule[]

  if (!predicted_molecules) {
    return {
      props: {
        stage: STAGE.ANALYSIS,
        metadata: metadata,
        lab_order: labOrder as LabOrder,
      },
    }
  }

  return {
    props: {
      stage: STAGE.COMPLETE,
      metadata: metadata,
      lab_order: labOrder as LabOrder,
      // @ts-ignore
      predicted_molecules: predicted_molecules,
    },
  }
}

export async function getStaticPaths() {
  // Determine all possible values for the slug
  // You could fetch these from a database or an API
  // Here, we'll use a mock list of slugs
  const { data, error } = await supabase.from("lab_order").select("id")

  if (!data) return []

  if (error) {
    console.log("error", error)
    return []
  }

  const slugs = data.map(({ id }) => id.toString())

  const myPaths = slugs.map((id) => ({ params: { id } }))

  return {
    paths: myPaths,
    fallback: false, // or 'blocking' for on-demand SSR
  }
}
