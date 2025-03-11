'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';

import AccountPopup from '../AccountPopup/page';
import CartPopup from '../CartPopup/page';

function MainHeader() {
    const [openCart, setOpenCart] = useState<boolean>(false);
    const [openUser, setOpenUser] = useState<boolean>(false);
    const pathname = usePathname();
    const router = useRouter();
    const isHideCart = pathname.includes('/cart') || pathname.includes('/auth');
    const isHideAccount = pathname.includes('/account') || pathname.includes('/auth');
    let timeout: NodeJS.Timeout;

    useEffect(() => {
        setOpenCart(false);
        setOpenUser(false);
    }, [pathname]);

    const handleMouseEnterCart = () => {
        if (openUser) setOpenUser(false);
        clearTimeout(timeout);
        setOpenCart(true);
    };

    const handleMouseLeaveCart = () => {
        timeout = setTimeout(() => {
            setOpenCart(false);
        }, 150);
    };

    const handleMouseEnterUser = () => {
        if (openCart) setOpenCart(false);
        clearTimeout(timeout);
        setOpenUser(true);
    };

    const handleMouseLeaveUser = () => {
        timeout = setTimeout(() => {
            setOpenUser(false);
        }, 150);
    };

    return (
        <div
            className="appPadding flex w-full items-center justify-between bg-white lg:border-b-[1px] lg:border-[#dddddd]"
            id="main-top">
            <Link
                href={'/'}
                target="_self">
                <Image
                    src={'/images/logo.avif'}
                    alt="brand-logo"
                    width={1000}
                    height={1000}
                    className="h-[30px] w-full object-cover"
                />
            </Link>

            <div className="flex items-center gap-x-6 text-black">
                {!isHideCart && (
                    <div
                        className="relative"
                        onMouseEnter={handleMouseEnterCart}
                        onMouseLeave={handleMouseLeaveCart}>
                        <FiShoppingCart
                            className="h-5 w-5 cursor-pointer"
                            onClick={() => router.push('/cart')}
                        />

                        {openCart && <CartPopup />}
                    </div>
                )}

                {!isHideAccount && (
                    <div
                        className="relative flex items-end gap-x-2"
                        onMouseEnter={handleMouseEnterUser}
                        onMouseLeave={handleMouseLeaveUser}>
                        <FaRegUser
                            className="h-5 w-5 cursor-pointer"
                            onClick={() => router.push('/account')}
                        />
                        <div>Sign in</div>

                        {openUser && <AccountPopup />}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MainHeader;
