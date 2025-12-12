import TravelPlanDetails from "@/components/shared/TravelPlanDetails";
import { serverFetch } from "@/lib/serverFetch";

interface Props {
  params: { id: string };
}

export default async function TravelPlanDetailsPage({ params }: Props) {
  const { id } = await params;

  const res = await serverFetch.get(`/travel-plan/${id}`, { cache: "no-store" });
  const response = await res.json();


  if (!response?.data) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <h2 className="text-xl font-semibold">Travel Plan Not Found</h2>
        <p className="text-gray-500">This travel plan may have been deleted.</p>
      </div>
    );
  }

  return <TravelPlanDetails plan={response.data} />;
}
