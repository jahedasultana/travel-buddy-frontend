export const dynamic = "force-dynamic";
import TravelPlansTable from "@/components/modules/admin/travelPlanManagement/TravelPlansTable"
import TablePagination from "@/components/shared/tables/TablePagination"
import { queryStringFormatter } from "@/lib/formatter"
import { getAllTravelPlans } from "@/services/travelPlan/travelPlanManagement"

const TravelPlans = async ({searchParams}: {
  searchParams: Promise<{[key: string]: string | string[] | undefined}>
}) => {

  const searchParamsObj = await searchParams
  const queryString = queryStringFormatter(searchParamsObj)
  const travelPlans = await getAllTravelPlans(queryString)
  
  const totalPages = Math.ceil(
    (travelPlans?.meta?.total || 1) / (travelPlans?.meta?.limit || 1)
  );

  return (
    <div>
      <TravelPlansTable travelPlans={travelPlans?.data} />
      <div className="mt-4 flex justify-start">
        <TablePagination currentPage={travelPlans?.meta?.page || 1} totalPages={totalPages || 1} />
      </div>
    </div>
  )
}

export default TravelPlans
