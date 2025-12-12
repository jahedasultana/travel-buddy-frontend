export const dynamic = "force-dynamic";
import PageHeader from "@/components/shared/PageHeader"
import TravelPlanCard from "@/components/shared/TravelPlanCard"
import TravelPlanFilter from "@/components/shared/TravelPlanFilter";
import { queryStringFormatter } from "@/lib/formatter"
import { getAllTravelPlans } from "@/services/travelPlan/travelPlanManagement"

const TravelPlans = async ({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const searchParamsObj = await searchParams
  const queryString = queryStringFormatter(searchParamsObj)
  const travelPlanData = await getAllTravelPlans(queryString)
  const travelPlans = travelPlanData?.data || []
  
  return (
    <div>
      <PageHeader title="Find Buddy" description="Explore all plans and find your buddy." backgroundImage="/images/bg-banner/travel-plans.jpg" />

      <div className="container mx-auto px-5 my-10">
        <TravelPlanFilter/>
      </div>

      <div className="container mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {travelPlans.length > 0 && travelPlans.map((plan: any) => (
          <TravelPlanCard key={plan.id} travelPlan={plan} />
        ))}
      </div>
    </div>
  )
}

export default TravelPlans
