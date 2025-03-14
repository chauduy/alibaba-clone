'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';

import { getUserInfo } from '@/redux/feature/auth/authThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { storage } from '@/util';

import AccountPopup from '../AccountPopup/page';
import CartPopup from '../CartPopup/page';

function MainHeader() {
    const [openCart, setOpenCart] = useState<boolean>(false);
    const [openUser, setOpenUser] = useState<boolean>(false);
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state: RootState) => state.auth);
    const isHideCart = pathname.includes('/cart') || pathname.includes('/auth');
    const isHideAccount = pathname.includes('/account') || pathname.includes('/auth');
    let timeoutCart: NodeJS.Timeout;
    let timeoutUser: NodeJS.Timeout;

    useEffect(() => {
        if (user !== null) {
            dispatch(getUserInfo({ uid: user.uid }));
        }
    }, [pathname]);

    useEffect(() => {
        setOpenCart(false);
        setOpenUser(false);
    }, [pathname]);

    const handleMouseEnterCart = () => {
        if (openUser) setOpenUser(false);
        clearTimeout(timeoutCart);
        setOpenCart(true);
    };

    const handleMouseLeaveCart = () => {
        timeoutCart = setTimeout(() => {
            setOpenCart(false);
        }, 150);
    };

    const handleMouseEnterUser = () => {
        if (openCart) setOpenCart(false);
        clearTimeout(timeoutUser);
        setOpenUser(true);
    };

    const handleMouseLeaveUser = () => {
        timeoutUser = setTimeout(() => {
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
                        {user ? (
                            <FiShoppingCart
                                className="h-5 w-5 cursor-pointer"
                                onClick={() => router.push('/cart')}
                            />
                        ) : (
                            <FiShoppingCart
                                className="h-5 w-5 cursor-pointer"
                                onClick={() => router.push('/auth/login')}
                            />
                        )}

                        {openCart && <CartPopup />}
                    </div>
                )}

                {!isHideAccount && (
                    <>
                        {user ? (
                            <div
                                className="relative flex items-end gap-x-2"
                                onMouseEnter={handleMouseEnterUser}
                                onMouseLeave={handleMouseLeaveUser}>
                                <FaRegUser
                                    className="h-5 w-5 cursor-pointer"
                                    onClick={() => router.push('/account')}
                                />

                                {openUser && <AccountPopup />}
                            </div>
                        ) : (
                            <div
                                className="flex cursor-pointer items-center gap-x-2"
                                onClick={() => {
                                    storage.setItem('path', pathname);
                                    router.push('/auth/login');
                                }}>
                                <FaRegUser className="h-5 w-5" />
                                <div className="mt-0.5">Sign in</div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default MainHeader;
