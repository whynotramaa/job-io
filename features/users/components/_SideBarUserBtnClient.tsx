"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { Avatar, AvatarImage } from "@/components/ui/Avatar"
import { ChevronsUpDown, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react"
import { AvatarFallback } from "@radix-ui/react-avatar"
import Link from "next/link"
import { SignOutButton, useClerk } from "@clerk/nextjs"

type UserProps = {
    user: { name: string, imageUrl: string, email: string }
}

type UserInfoProps = {
    name: string;
    imageUrl: string;
    email: string;
}

export function SideBarUserBtnClient({ user }: UserProps) {
    const { isMobile, setOpenMobile } = useSidebar()
    const { openUserProfile } = useClerk()
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ">

                    <UserInfo {...user} />

                    <ChevronsUpDown className="ml-auto group-data-[state=collapsed]:hidden" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={4} align="end" side={isMobile ? "bottom" : "right"} className="min-w-64 max-w-80" >
                {/* Dropdown menu content goes here */}
                <DropdownMenuLabel className="font-normal p-1">
                    <UserInfo {...user} />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                    openUserProfile()
                    setOpenMobile(false)
                }
                }>
                    <UserIcon className="mr-1" /> Profile
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href="/user-settings/notifications">
                        <SettingsIcon className="mr-1" /> Settings
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <SignOutButton>
                        <div className="flex items-center">
                            <LogOutIcon className="mr-1" /> Log Out
                        </div>
                    </SignOutButton>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// Explicitly type the props for the UserInfo component
function UserInfo({ name, email, imageUrl }: UserInfoProps) {
    const nameInitials = name.split(" ").slice(0, 2).map(str => str[0]).join("")
    return (
        <div className="flex items-center gap-2 overflow-hidden">
            <Avatar className="rounded-full overflow-hidden size-8 min-w-8 min-h-8">
                <AvatarImage
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover rounded-full"
                />
                <AvatarFallback className="uppercase rounded-full  min-w-8 min-h-8 bg-primary text-primary-foreground">
                    {nameInitials}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col flex-1 min-w-0 leading-tight overflow-hidden group-data-[state=collapsed]:hidden">
                <span className="truncate text-sm font-semibold">
                    {name}
                </span>
                <span className="truncate text-xs ">
                    {email}
                </span>
            </div>
        </div>
    )
}