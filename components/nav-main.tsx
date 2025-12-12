"use client"

import { ChevronRight, User } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { JSX } from "react"
import { IUserInfo } from "@/types/user.interface"


interface INavItems {
  title: string,
  icon: JSX.Element,
  isActive: boolean,
  items: INavItem[]
}

interface INavItem {
  title: string,
  url: string,
  icon: JSX.Element
}

type NavMainProps = {
  adminNavItems: INavItems[]
  userNavItems: INavItems[]
  userInfo: IUserInfo | null
}


export function NavMain({ adminNavItems, userNavItems, userInfo }: NavMainProps) {
  const pathName = usePathname()
  console.log(pathName)
  let navItems: INavItems[] | null = null

  if (userInfo?.role === 'ADMIN') {
    navItems = adminNavItems
  } else if (userInfo?.role === 'USER') {
    navItems = userNavItems
  }else{
    navItems = []
  }

  return (
    <SidebarGroup className="mt-5">
      <SidebarMenu>
        {navItems && navItems.length > 0 && navItems.map((item) => {
          return <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="cursor-pointer font-medium text-gray-700 text-md" tooltip={item.title}>
                  {item?.icon}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem id="sidebarMenuSubItem" key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link className={`${subItem.url === pathName && 'bg-gray-300'} rounded-md py-5 px-3 font-medium`} href={subItem.url}>
                          {subItem?.icon}
                          {subItem.title}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem> 
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
