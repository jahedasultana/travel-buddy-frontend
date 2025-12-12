'use client'
export const dynamic = "force-dynamic";
import { redirect, usePathname } from "next/navigation";
const UserDashboard = () => {
  const path = usePathname()

  if(path === '/user/dashboard'){
    redirect('/user/dashboard/create-plan')
  }
  return (
    <div>
      
    </div>
  )
}

export default UserDashboard
