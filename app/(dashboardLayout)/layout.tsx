import { AppSidebar } from "@/components/app-sidebar"
import DashboardNavbar from "@/components/modules/dashboard/dashboardNavbar/DashboardNavbar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { IUserInfo } from "@/types/user.interface"
import getLogedInUser from "@/utils/getLogedInUser"

const CommonDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const userInfo = await getLogedInUser() as IUserInfo
  return (
    <SidebarProvider>
      {/* sidebar  */}
      <AppSidebar userInfo = {userInfo} />
      <SidebarInset>
        {/* daahsboard navbar  */}
        <DashboardNavbar/>
        {/* main dynamic content  */}
        <div className="p-10">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default CommonDashboardLayout
