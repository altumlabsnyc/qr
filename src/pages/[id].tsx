import OrderDisplay, { OrderDisplayProps } from "@/components/OrderDisplay";
import { OrderData } from "@/types/OrderData";
import { supabase } from "@/utils/supabase";

export default function LabOrder({ order, error }: OrderDisplayProps) {
  return <OrderDisplay order={order} error={error} />;
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

  const orderData = {
    ...data,
    lot: data?.lot[0],
  } as OrderData | null;
  console.log("orderData", orderData);
  console.log("orderError", orderError);

  if (!orderData) return { props: {} };

  if (orderError) {
    return { props: { error: orderError } };
  }

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

  const paths = slugs.map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: false, // or 'blocking' for on-demand SSR
  };
}
