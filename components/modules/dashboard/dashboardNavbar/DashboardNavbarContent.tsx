import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { IUserInfo } from "@/types/user.interface"
import Link from "next/link"
import DashboardNavbarSearch from "./DashboardNavbarSearch"
import DashboardNavbarProfile from "./DashboardNavbarProfile"
import Logo from "@/components/logo"

interface DashbaordNavbarContentProps {
  userInfo: IUserInfo | null
}

const DashboardNavbarContent = ({ userInfo }: DashbaordNavbarContentProps) => {
  return (
    <div className="flex items-center justify-between gap-2 px-4">
      <div className="flex flex-1 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
      </div>
      <div className="flex flex-11 items-center justify-between gap-10">
        <div className="flex-4 flex justify-start">
          <Link href={'/'}>
            <Logo/>
          </Link>
        </div>
        {/* <div className="flex-4">
          <DashboardNavbarSearch />
        </div> */}
        <div className="flex-4 flex justify-end">
          <DashboardNavbarProfile/>
        </div>
      </div>
    </div>
  )
}

export default DashboardNavbarContent
