import ParticipantsList from "@/components/modules/participant/ParticipantList";
import { serverFetch } from "@/lib/serverFetch";
import { getHostParticipant } from "@/services/participant/participantManagement";

export default async function ParticipantsPage() {
    const participants = await getHostParticipant()

    console.log(participants, 'hiiiii sooo')

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-6">My Trip Participants</h1>
            <ParticipantsList joinedPlans={participants} />
        </div>
    );
}
