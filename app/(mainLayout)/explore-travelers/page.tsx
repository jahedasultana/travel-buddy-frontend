export const dynamic = "force-dynamic";
import DisplayTravelers from "@/components/shared/DisplayTravelers";
import PageHeader from "@/components/shared/PageHeader"
import { getAllUsers } from "@/services/admin/userManagement"

const ExploreTravelers = async() => {

    const usersData = await getAllUsers()
    const travelers = usersData?.data?.length > 0 && usersData?.data?.filter((user: any) => user?.createdTravelPlans?.length > 0 && user?.verifiedBadge) || []


  return (
    <div>
      <PageHeader title="Explore Travelers" description="Explore all the travellers" backgroundImage="/images/bg-banner/explore-traveler.jpg"/>
      <DisplayTravelers travelers = {travelers}/>
    </div>
  )
}

export default ExploreTravelers
