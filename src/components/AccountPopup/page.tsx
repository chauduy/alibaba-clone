import React from 'react';

import Link from 'next/link';

import { accountLink } from '@/constants';

import { Button } from '../ui/button';

function AccountPopup() {
    return (
        <div className="top-8 z-50 hidden rounded-2xl bg-gray-100 pb-4 pt-6 text-sm shadow-black lg:absolute lg:left-[-345px] lg:block lg:w-96">
            <div className="absolute right-3.5 top-0 h-0 w-0 -translate-x-1/2 -translate-y-full border-b-8 border-l-8 border-r-8 border-b-gray-100 border-l-transparent border-r-transparent"></div>

            <div className="mx-6 mb-4 border-b border-[#dddddd] pb-4 font-bold">Hi, Duy</div>
            <div className="flex flex-col">
                {accountLink.map((item) => (
                    <Link
                        href={item.link}
                        key={item.label}
                        className="px-6 py-2 hover:bg-white hover:font-bold">
                        {' '}
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="mx-6 mt-4 border-t-[1px] border-[#dddddd] pt-2">
                <Button
                    variant={'ghost'}
                    className="m-0 p-0 font-normal">
                    Sign out{' '}
                </Button>
            </div>
        </div>
    );
}

export default AccountPopup;
