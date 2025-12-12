"use client"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { BaggageClaim, GitPullRequestIcon, List, ListCheck, PersonStanding, PlaneTakeoff, Settings, User, User2, Users } from "lucide-react";
import { IUserInfo } from "@/types/user.interface";

const data = {
  adminNavItems: [
    {
      title: "User Management",
      icon: <User />,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "/admin/dashboard/users",
          icon: <PersonStanding />
        }
      ],
    },
    {
      title: "Travel Management",
      icon: <PlaneTakeoff />,
      isActive: false,
      items: [
        {
          title: "Travel Plans",
          url: "/admin/dashboard/travel-plans",
          icon: <BaggageClaim />
        }
      ],
    }
  ],
  userNavItems: [
    {
      title: "Travel Plans",
      icon: <PlaneTakeoff />,
      isActive: true,
      items: [
        {
          title: "Create Plan",
          url: "/user/dashboard/create-plan",
          icon: <BaggageClaim />
        },
        {
          title: "My Plans",
          url: "/user/dashboard/my-travel-plans",
          icon: <List />
        }
      ],
    },
    {
      title: "Participants",
      icon: <Users />,
      isActive: false,
      items: [
        {
          title: "All Participants",
          url: "/user/dashboard/participants",
          icon: <BaggageClaim />
        }
      ],
    },
    {
      title: "Join Request",
      icon: <GitPullRequestIcon />,
      isActive: false,
      items: [
        {
          title: "Request Got",
          url: "/user/dashboard/join-requests-got",
          icon: <ListCheck />
        },
        {
          title: "Request Sent",
          url: "/user/dashboard/join-requests-sent",
          icon: <ListCheck />
        }
      ],
    },
    {
      title: "Settings",
      icon: <Settings />,
      isActive: false,
      items: [
        {
          title: "Profile",
          url: "/user/dashboard/profile",
          icon: <User2 />
        }
      ],
    }
  ]
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  userInfo: IUserInfo
}

export function AppSidebar({ userInfo, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain adminNavItems={data.adminNavItems} userNavItems={data.userNavItems}  userInfo={userInfo} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
