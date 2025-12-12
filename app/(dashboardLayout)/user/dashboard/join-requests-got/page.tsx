import JoinRequestCard from "@/components/modules/join-request/JoinRequestCard";
import { getMyPlanRequests } from "@/services/travelPlan/travelPlanRequest"

const JoinRequests = async () => {
    const requests = await getMyPlanRequests();

    console.log(requests, 'req')
    return (
        <div className="p-6">
            {requests?.length === 0 && (
                <div className="flex items-center justify-center mt-30">
                    <p className="text-gray-500">No join requests found.</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests?.map((req: any) => (
                    <JoinRequestCard key={req.id} request={req} />
                ))}
            </div>
        </div>
    )
}

export default JoinRequests
