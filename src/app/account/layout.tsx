'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiFillHome } from 'react-icons/ai';
import { CgLogOut } from 'react-icons/cg';
import { FaList } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
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
import useViewport from '@/hooks/useViewport';
import { countOrders, getOrders, logOut } from '@/redux/feature/auth/authThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

const items = [
    {
        title: 'Home',
        url: '/account',
        icon: <AiFillHome className="homeIcon" />
    },
    {
        title: 'Order',
        url: '/account/order',
        icon: <FiFileText className="homeIcon" />
    },
    {
        title: 'My list',
        url: '/account/favorite',
        icon: <FaList className="homeIcon" />
    }
];
function AccountLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const viewport = useViewport();
    const isMobile = viewport.width < 768;

    useEffect(() => {
        if (!user) {
            router.push('/');
        } else {
            dispatch(countOrders({ uid: user.uid }));
            dispatch(getOrders({ uid: user.uid }));
        }
    }, [user]);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const handleSignOut = () => {
        dispatch(logOut());
        router.push('/');
    };

    if (user) {
        return (
            <SidebarProvider>
                <div className="flex min-h-screen w-full">
                    <Sidebar
                        className={`transition-all duration-200 ${isOpen ? 'w-64' : 'w-16'}`}
                        collapsed={
                            !isMobile ? (!isOpen ? 'false' : 'true') : !isOpen ? 'true' : 'false'
                        }
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
                                                    className="h-10 w-full object-cover"
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
                                            <SidebarMenuItem
                                                key={item.title}
                                                onClick={() => router.push(item.url)}>
                                                <SidebarMenuButton asChild>
                                                    <div className="flex items-center gap-2 p-4">
                                                        {item.icon}
                                                        <span
                                                            className={`text-[16px] text-white ${!isOpen ? 'lg:hidden' : ''}`}>
                                                            {item.title}
                                                        </span>
                                                    </div>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                        <div className="pl-4">
                                            <Button
                                                variant={'ghost'}
                                                className={`w-20 text-white hover:bg-transparent hover:text-white ${!isOpen ? 'lg:w-10 lg:!pl-0' : ''}`}
                                                onClick={handleSignOut}>
                                                <CgLogOut />
                                                <div className={`${!isOpen ? 'lg:hidden' : ''}`}>
                                                    Sign out
                                                </div>
                                            </Button>
                                        </div>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>

                    <main
                        className={`w-full transition-all duration-200 ${isOpen ? 'lg:ml-48' : ''}`}>
                        {isMobile && (
                            <div className="flex items-center gap-x-4 border-b border-slate-200 px-4 py-3">
                                <Link
                                    href={'/'}
                                    target="_self">
                                    <Image
                                        src={'/images/brand-logo.png'}
                                        alt="brand-logo"
                                        width={1000}
                                        height={1000}
                                        className="h-10 w-10 object-cover"
                                    />
                                </Link>
                                <SidebarTrigger
                                    open={isOpen}
                                    toggleSidebar={toggleSidebar}
                                    isMobile
                                />
                            </div>
                        )}
                        {children}
                    </main>
                </div>
            </SidebarProvider>
        );
    }
}

export default AccountLayout;
