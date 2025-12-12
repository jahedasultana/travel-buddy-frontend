export const dynamic = "force-dynamic";

import getLogedInUser from "@/utils/getLogedInUser";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const user = await getLogedInUser();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <ProfileClient user={user} />
    </div>
  );
}
