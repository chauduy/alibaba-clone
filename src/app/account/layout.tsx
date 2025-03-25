'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import { FaList } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
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
        icon: <AiFillHome className="homeIcon" />
    },
    {
        title: 'Order',
        url: '#',
        icon: <FiFileText className="homeIcon" />
    },
    {
        title: 'My list',
        url: '#',
        icon: <FaList className="homeIcon" />
    }
];
function HomeLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <Sidebar
                    className={`transition-all duration-200 ${isOpen ? 'w-64' : 'w-16'}`}
                    collapsed={!isOpen ? 'false' : 'true'}
                    variant="sidebar"
                    collapsible="icon">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <div className="flex items-center justify-between border-b border-white px-4 py-2">
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
                                                    className="flex items-center gap-2 p-4"
                                                    href={item.url}
                                                    target="_self">
                                                    {item.icon}
                                                    <span
                                                        className={`text-[16px] text-white ${!isOpen ? 'hidden' : ''}`}>
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

                <main className={`flex-1 p-6 transition-all duration-200 ${isOpen ? 'ml-48' : ''}`}>
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}

export default HomeLayout;
