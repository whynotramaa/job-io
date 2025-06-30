import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { APpSidebarCLient } from './_AppSidebarClient'
import Link from 'next/link'
import { LogInIcon } from 'lucide-react'
import { SignedIn, SignedOut } from '@clerk/nextjs'

import { SidebarUserBtn } from '@/features/users/components/SidebarUserButton'


const HomePage = () => {
  // const { userId } = await auth()
  // if (!userId) {
  //   redirect('/sign-in')
  // }
  return (
    <SidebarProvider className='overflow-y-hidden'>
      <APpSidebarCLient>
        <Sidebar collapsible='icon' className='overflow-y-hidden'>
          <SidebarHeader className='flex-row'>
            <SidebarTrigger />
            <span className='text-xl flex-nowrap'>
              JobIo
            </span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SignedOut>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/sign-in'>
                        <LogInIcon />
                        <span>
                          Log In
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SignedOut>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SignedIn>
            <SidebarFooter className='mb-2'>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <SidebarUserBtn />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </SignedIn>
        </Sidebar>
        <main className='flex-1'>
          dhudqebdl
        </main>
      </APpSidebarCLient>
    </SidebarProvider>
  )
}

export default HomePage