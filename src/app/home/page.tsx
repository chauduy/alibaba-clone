'use client';

import { useState } from 'react';

import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from '@/components/ui/sidebar';

const items = [
    {
        title: 'Home',
        url: '#',
        icon: Home
    },
    {
        title: 'Inbox',
        url: '#',
        icon: Inbox
    },
    {
        title: 'Calendar',
        url: '#',
        icon: Calendar
    },
    {
        title: 'Search',
        url: '#',
        icon: Search
    },
    {
        title: 'Settings',
        url: '#',
        icon: Settings
    }
];

function HomePage() {
    const [isOpen, setIsOpen] = useState(true); // Manage sidebar state here

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <SidebarProvider className="flex items-start">
            <Sidebar
                className={`transition-all duration-200 ${isOpen ? 'w-64' : 'w-16'}`}
                collapsed={!isOpen}
                variant="sidebar"
                collapsible="icon">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <div className="flex items-center justify-between border-b border-white py-2 pl-2">
                                    <Link
                                        href={'/'}
                                        target="_self"
                                        className={`flex items-center gap-x-1.5 ${!isOpen ? 'hidden' : ''}`}>
                                        <Image
                                            src={'/images/brand-logo.png'}
                                            alt="brand-logo"
                                            width={1000}
                                            height={1000}
                                            className="h-[40px] w-full object-cover"
                                        />
                                        <span className="text-[20px] font-bold text-primary">
                                            Alibaba
                                        </span>
                                    </Link>
                                    <SidebarTrigger
                                        open={isOpen}
                                        toggleSidebar={toggleSidebar}
                                    />
                                </div>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                href={item.url}
                                                target="_self">
                                                <item.icon />
                                                <span className={`${!isOpen ? 'hidden' : ''}`}>
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    );
}

export default HomePage;
