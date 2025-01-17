'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { CiYoutube } from 'react-icons/ci';
import { FaSpotify } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import { FaPinterestP } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { SiStarbucks } from 'react-icons/si';
import { TbBrandX } from 'react-icons/tb';

import HeaderMenu from '@/components/HeaderMenu/page';

function Home() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="relative h-full w-full pt-28 lg:pt-0">
            <div
                className={`left-0 top-0 z-10 h-full w-full border-none bg-black/50 transition duration-1000 ${isOpen ? 'absolute opacity-100' : 'hidden opacity-0'}`}
            />
            <div
                className={`fixed left-0 top-0 z-20 w-full bg-white p-4 lg:hidden ${isOpen ? '' : 'border-secondary border-b-2'}`}>
                <Link
                    href={'/'}
                    target="_self">
                    <SiStarbucks className="h-10 w-10 text-primary md:h-[50px] md:w-[50px]" />
                </Link>
                <HeaderMenu
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </div>
            <div className="border-secondary hidden border-b-2 px-6 py-4 lg:flex lg:items-center lg:justify-between lg:px-10 lg:py-6">
                <div className="flex items-center">
                    <Link
                        href={'/'}
                        target="_self">
                        <SiStarbucks className="h-[50px] w-[50px] text-primary" />
                    </Link>
                    <Link
                        href={'/'}
                        className="headerLink ml-10"
                        target="_self">
                        MENU
                    </Link>
                    <Link
                        href={'/'}
                        className="headerLink ml-6"
                        target="_self">
                        REWARDS
                    </Link>
                    <Link
                        href={'/'}
                        className="headerLink ml-6"
                        target="_self">
                        GIFT CARDS
                    </Link>
                </div>
                <div className="flex items-center">
                    <Link
                        href={'/'}
                        target="_self"
                        className="mr-16 flex text-black hover:text-primary">
                        <IoLocationSharp className="h-6 w-6" />
                        <div className="ml-3 text-sm font-semibold">Find a store</div>
                    </Link>
                    <button className="mr-4 flex items-center rounded-full border-[1px] border-black px-4 pb-1.5 pt-1 text-sm font-semibold tracking-[1px] text-black hover:bg-gray-200">
                        Sign in
                    </button>
                    <button className="flex items-center rounded-full bg-black px-4 pb-1.5 pt-1 text-sm font-semibold tracking-[1px] text-white hover:bg-black/70">
                        Join now
                    </button>
                </div>
            </div>
            <main>
                <section className="md:flex md:items-center md:bg-[#CFE6B5] md:py-8 lg:mx-10 lg:mt-8 lg:py-0">
                    <Image
                        src={'/images/home/home-img-01.webp'}
                        alt="home-img"
                        className="h-full w-full md:w-1/2"
                        width={1000}
                        height={1000}
                    />
                    <div className="flex flex-col items-center bg-[#CFE6B5] px-4 py-8 text-center text-[#1d3c34] md:px-8 md:py-0">
                        <h2 className="mb-6 text-[28px] font-semibold tracking-[1.5px] md:text-[32px]">
                            The best of winter
                        </h2>
                        <p className="mb-8 text-[20px] leading-[1.5] tracking-[0.5px] md:w-[95%] md:text-[26px]">
                            A new winter menu is here, featuring new Cortado alongside Pistachio
                            beverages and Matcha Latte—now customized to your perfect level of
                            sweetness.
                        </p>
                        <button className="rounded-[50px] border-[1px] border-[#1d3c34] px-4 py-2 text-[15px] font-semibold text-[#1d3c34]">
                            Add to order
                        </button>
                    </div>
                </section>
                <section className="mt-8 md:flex md:items-center md:bg-[#CFE6B5] md:py-8 lg:mx-10 lg:py-0">
                    <Image
                        src={'/images/home/home-img-02.webp'}
                        alt="home-img"
                        className="h-full w-full md:order-last md:w-1/2"
                        width={1000}
                        height={1000}
                    />
                    <div className="bg-[#CFE6B5] px-4 py-8 text-center text-[#1d3c34] md:px-8 md:py-0">
                        <h2 className="mb-6 text-[28px] font-semibold tracking-[1.5px] md:text-[32px]">
                            From the birthplace of coffee
                        </h2>
                        <p className="mb-8 text-[20px] leading-[1.5] md:text-[26px]">
                            With distinctive floral, tangerine and lemon balm notes, Single-Origin
                            Ethiopia is a unique global favorite.
                        </p>
                        <button className="rounded-[50px] border-[1px] border-[#1d3c34] px-4 py-2 text-[15px] font-semibold text-[#1d3c34]">
                            Add to order
                        </button>
                    </div>
                </section>
                <section className="mt-8 md:flex md:items-center md:bg-[#CFE6B5] md:py-8 lg:mx-10 lg:py-0">
                    <Image
                        src={'/images/home/home-img-03.webp'}
                        alt="home-img"
                        className="h-full w-full md:w-1/2"
                        width={1000}
                        height={1000}
                    />
                    <div className="flex flex-col items-center bg-[#CFE6B5] px-4 py-8 text-center text-[#1d3c34] md:px-16 md:py-0">
                        <h2 className="mb-6 text-[22px] font-semibold tracking-[1.5px] md:text-[26px]">
                            Your first taste of Rewards is free
                        </h2>
                        <p className="mb-8 text-[16px] leading-[1.5] md:text-[20px]">
                            Unlock Rewards from the very first sip, starting with a free handcrafted
                            drink when you make a qualifying purchase during your first week as a
                            Starbucks<sup>®</sup>
                        </p>
                        <button className="rounded-[50px] border-[1px] border-[#1d3c34] px-4 py-2 text-[15px] font-semibold text-[#1d3c34]">
                            Join now
                        </button>
                    </div>
                </section>
                <section className="mt-8 md:flex md:justify-center">
                    <p className="px-4 py-8 text-center text-[13px] leading-[1.8] text-black md:w-[57%] lg:w-[43%]">
                        * Valid for new Starbucks Rewards members for 7 days from sign up. Coupon
                        will be available in the offers tab of your Starbucks app following sign up
                        and may take up to 48 hours to arrive. Good at participating U.S. stores for
                        a handcrafted menu-sized beverage with qualifying purchase ($8 max value).
                        Qualifying purchase excludes alcohol, Starbucks Card and Card reloads. Limit
                        one. Cannot be combined with other offers or discounts. Excludes delivery
                        services. Sign up before 3/30/2025.
                    </p>
                </section>
                <footer className="h-full w-full p-6 text-black lg:px-10">
                    <div className="flex h-full w-full items-center gap-x-4">
                        <Link
                            href={'https://open.spotify.com/user/starbucks'}
                            target="_blank">
                            <FaSpotify className="h-8 w-8" />
                        </Link>
                        <Link
                            className="wrapperIcon"
                            href={'https://facebook.com/starbucks'}
                            target="_blank">
                            <FaFacebookF className="footerIcon" />
                        </Link>
                        <Link
                            className="wrapperIcon"
                            href={'https://www.pinterest.com/starbucks/'}
                            target="_blank">
                            <FaPinterestP className="footerIcon" />
                        </Link>
                        <Link
                            className="wrapperIcon"
                            href={'https://instagram.com/starbucks'}
                            target="_blank">
                            <FaInstagram className="footerIcon" />
                        </Link>
                        <Link
                            className="wrapperIcon"
                            href={'https://www.youtube.com/starbucks'}
                            target="_blank">
                            <CiYoutube className="footerIcon" />
                        </Link>
                        <Link
                            className="wrapperIcon"
                            href={'https://x.com/starbucks/'}
                            target="_blank">
                            <TbBrandX className="footerIcon" />
                        </Link>
                    </div>
                    <div className="mt-4 flex flex-col md:mt-8">
                        <Link
                            target="_blank"
                            href={'https://www.starbucks.com/terms/privacy-notice/'}
                            className="footerLink">
                            Privacy Notice
                        </Link>
                        <Link
                            target="_blank"
                            href={'https://www.starbucks.com/terms/privacy-notice/'}
                            className="footerLink">
                            Consumer Health Privacy Notice
                        </Link>
                        <Link
                            target="_blank"
                            href={'https://www.starbucks.com/terms/starbucks-terms-of-use/'}
                            className="footerLink">
                            Terms of Use
                        </Link>
                        <Link
                            target="_blank"
                            href={'https://www.starbucks.com/personal-information'}
                            className="footerLink">
                            Do Not Share My Personal Information
                        </Link>
                        <Link
                            target="_blank"
                            href={
                                'https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-70076.pdf'
                            }
                            className="footerLink">
                            CA Supply Chain Act
                        </Link>
                        <Link
                            target="_blank"
                            href={'https://www.starbucks.com/about-us/accessibility/'}
                            className="footerLink">
                            Accessibility
                        </Link>
                        <p className="py-4 text-xs text-gray-500 md:text-sm">
                            © 2025 Starbucks Coffee Company. All rights reserved.
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}

export default Home;
