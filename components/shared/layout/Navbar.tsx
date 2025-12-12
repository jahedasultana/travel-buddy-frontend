import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import LogoutUserButton from "@/components/LogoutUserButton";
import getLogedInUser from "@/utils/getLogedInUser";
import Logo from "@/components/logo";

export default async function Navbar() {

  const user = await getLogedInUser()

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/explore-travelers", label: "Explore Travelers" },
    user?.email && { href: "/travel-plans", label: "Find Buddy" },
    { href: "/subscription", label: "Subscriptions" },
  ];


  return (
    <header className="border-b px-4 md:px-6">
      <div className="container mx-auto px-5 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                size="icon"
                variant="ghost"
              >
                <svg
                  className="pointer-events-none"
                  fill="none"
                  height={16}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="-translate-y-[7px] origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    d="M4 12L20 12"
                  />
                  <path
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    d="M4 12H20"
                  />
                  <path
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    d="M4 12H20"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink className="py-1.5" href={link?.href}>
                        {link?.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Logo />
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden" viewport={false}>
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                      href={link?.href}
                    >
                      {link?.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          {user?.email ?

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer border border-black">
                  <AvatarImage src={user?.profileImage} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {user?.email && user?.role === 'ADMIN' &&

                  <>


                    <Link href={'/admin/dashboard/profile'} className="cursor-pointer">
                      <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                    </Link>

                    <Link href={'/admin/dashboard'} className="cursor-pointer">
                      <DropdownMenuItem className="cursor-pointer">Admin Dashboard</DropdownMenuItem>
                    </Link>
                  </>

                }

                {user?.email && user?.role === 'USER' &&

                  <>

                    <Link href={'/user/dashboard/profile'} className="cursor-pointer">
                      <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                    </Link>

                    <Link href={'/user/dashboard'} className="cursor-pointer">
                      <DropdownMenuItem className="cursor-pointer">User Dashboard</DropdownMenuItem>
                    </Link>

                    <Link href={'/user/dashboard/my-travel-plans'} className="cursor-pointer">
                      <DropdownMenuItem className="cursor-pointer">My Plans</DropdownMenuItem>
                    </Link>
                  </>

                }
                <Link href={'/subscription'} className="cursor-pointer">
                  <DropdownMenuItem className="cursor-pointer">Subscriptions</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <LogoutUserButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            :
            <Link href={'/login'}>
              <Button className="cursor-pointer">Login</Button>
            </Link>
          }
        </div>
      </div>
    </header >
  );
}
