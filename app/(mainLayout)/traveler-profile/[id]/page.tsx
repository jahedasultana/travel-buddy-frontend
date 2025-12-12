import ProfileClient from "@/app/(dashboardLayout)/user/dashboard/profile/ProfileClient";
import { getUserById } from "@/services/user/userManagement";
import getLogedInUser from "@/utils/getLogedInUser";

export default async function TravelerProfile({params}: {
  params: any
}) {
  const {id} = await params
  const user = await getUserById(id)

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <ProfileClient user={user} />
    </div>
  );
}
