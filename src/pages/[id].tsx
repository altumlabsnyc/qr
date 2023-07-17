import { Database } from "@/types/supabase";
import { supabase } from "@/utils/supabase";

type Order = Database["public"]["Tables"]["lab_order"]["Row"];
type Analysis = Database["public"]["Tables"]["analysis"]["Row"];

interface Props {
  order?: Order;
  analysis?: Analysis;
  error?: any;
}

export default function LabOrder({ order, analysis, error }: Props) {
  console.log(order);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }

  if (!order) {
    return <h1>Order not found</h1>;
  }

  if (!analysis) {
    return <h1>Analysis not found</h1>;
  }

  return (
    <div>
      <h1>{order.id}</h1>
      <p>{order.pickup_date}</p>
      <h2>{analysis.id}</h2>
      <p>{}</p>
    </div>
  );
}

export async function getStaticProps({
  params,
}: {
  params: { id: string };
}): Promise<{ props: Props }> {
  const { id } = params;

  const { data: orderData, error: orderError } = await supabase
    .from("lab_order")
    .select("*")
    .eq("id", id)
    .single();

  if (!orderData) return { props: {} };

  if (orderError) {
    return { props: { error: orderError } };
  }

  const analysis_id = orderData.analysis_id;
  const { data: analysisData, error: analysisError } = await supabase
    .from("analysis")
    .select("*")
    .eq("id", analysis_id)
    .single();

  if (!analysisData) return { props: { order: orderData } };

  if (analysisError) {
    return { props: { error: analysisError } };
  }

  return {
    props: {
      order: orderData,
      analysis: analysisData,
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
