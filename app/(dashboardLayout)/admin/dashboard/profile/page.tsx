import ProfileClient from "@/app/(dashboardLayout)/user/dashboard/profile/ProfileClient";
import getLogedInUser from "@/utils/getLogedInUser";

export default async function ProfilePage() {
  const user = await getLogedInUser();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <ProfileClient user={user} />
    </div>
  );
}
