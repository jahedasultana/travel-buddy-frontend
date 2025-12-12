import { IoMdNotifications } from "react-icons/io"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import getLogedInUser from "@/utils/getLogedInUser";
import { IUserInfo } from "@/types/user.interface";
import LogoutUserButton from "@/components/LogoutUserButton";

interface IDropdownMenu {
    title: string,
    link: string,
    icon: React.ReactElement
}

const DashboardNavbarProfile = async() => {

    const user = await getLogedInUser() as IUserInfo

    const dropdownMenuList = [
        {
            title: 'Profile',
            link: '/user/dashboard/profile',
            icon: <FaRegUserCircle />
        }
    ]

    return (
        <div className="flex items-center gap-5">
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Image src={user?.profileImage || ''} className='rounded-full cursor-pointer' width={30} height={30} alt="dashboard profile photo" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel className="text-lg">My Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="flex flex-col text-left items-start gap-0">
                                <h4 className="font-bold text-lg">Hi, {user?.name}</h4>
                                <p className="text-md font-medium">{user?.email}</p>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {dropdownMenuList.length > 0 && dropdownMenuList.map((item: IDropdownMenu, index: number) => {
                                return <Link href={item?.link} key={index} className="cursor-pointer">
                                    <DropdownMenuItem className="cursor-pointer">
                                        {item?.title}
                                        <DropdownMenuShortcut>{item?.icon}</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </Link>
                            })}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="bg-transparent">
                            <LogoutUserButton/>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default DashboardNavbarProfile
