import Image from 'next/image';
import { SiStarbucks } from 'react-icons/si';
import { IoMdMenu } from 'react-icons/io';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import { FaPinterestP } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { CiYoutube } from 'react-icons/ci';
import { TbBrandX } from 'react-icons/tb';

function Login() {
    return (
        <div className="h-full w-full">
            <div className="flex items-center justify-between border-b-2 border-[#dcdcdc] p-4">
                <Link
                    href={'/'}
                    target="_self">
                    <SiStarbucks className="h-10 w-10 text-primary" />
                </Link>
                <IconButton>
                    <IoMdMenu className="h-7 w-7 text-[#00000094]" />
                </IconButton>
            </div>
            <main>
                <section className="mt-8 lg:flex lg:bg-[#CFE6B5] lg:py-8">
                    <Image
                        src={'/images/home/home-img-01.webp'}
                        alt="home-img"
                        className="h-full w-full lg:w-1/2"
                        width={1000}
                        height={1000}
                    />
                    <div className="flex flex-col items-center bg-[#CFE6B5] px-4 py-8 text-center text-[#1d3c34]">
                        <h2 className="mb-6 text-[32px] font-semibold tracking-[1.5px]">
                            The best of winter
                        </h2>
                        <p className="mb-8 text-[26px] leading-[1.5] tracking-[0.5px] md:w-[95%]">
                            A new winter menu is here, featuring new Cortado alongside Pistachio
                            beverages and Matcha Latte—now customized to your perfect level of
                            sweetness.
                        </p>
                        <button className="rounded-[50px] border-[1px] border-[#1d3c34] px-4 py-2 text-[15px] font-semibold text-[#1d3c34]">
                            Add to order
                        </button>
                    </div>
                </section>
                <section className="mt-8 lg:flex lg:bg-[#CFE6B5] lg:py-8">
                    <Image
                        src={'/images/home/home-img-02.webp'}
                        alt="home-img"
                        className="h-full w-full lg:order-last lg:w-1/2"
                        width={1000}
                        height={1000}
                    />
                    <div className="bg-[#CFE6B5] px-4 py-8 text-center text-[#1d3c34]">
                        <h2 className="mb-6 text-[32px] font-semibold tracking-[1.5px]">
                            From the birthplace of coffee
                        </h2>
                        <p className="mb-8 text-[26px] leading-[1.5]">
                            With distinctive floral, tangerine and lemon balm notes, Single-Origin
                            Ethiopia is a unique global favorite.
                        </p>
                        <button className="rounded-[50px] border-[1px] border-[#1d3c34] px-4 py-2 text-[15px] font-semibold text-[#1d3c34]">
                            Add to order
                        </button>
                    </div>
                </section>
                <section className="mt-8 lg:flex lg:bg-[#CFE6B5] lg:py-8">
                    <Image
                        src={'/images/home/home-img-03.webp'}
                        alt="home-img"
                        className="h-full w-full lg:w-1/2"
                        width={1000}
                        height={1000}
                    />
                    <div className="flex flex-col items-center bg-[#CFE6B5] px-4 py-8 text-center text-[#1d3c34]">
                        <h2 className="mb-6 text-[26px] font-semibold tracking-[1.5px]">
                            Your first taste of Rewards is free
                        </h2>
                        <p className="mb-8 text-[20px] leading-[1.5] md:w-full">
                            Unlock Rewards from the very first sip, starting with a free handcrafted
                            drink when you make a qualifying purchase during your first week as a
                            Starbucks<sup>®</sup>
                        </p>
                        <button className="rounded-[50px] border-[1px] border-[#1d3c34] px-4 py-2 text-[15px] font-semibold text-[#1d3c34]">
                            Join now
                        </button>
                    </div>
                </section>
                <section className="mt-8 lg:flex lg:justify-center">
                    <p className="px-4 py-8 text-center text-[13px] leading-[1.8] text-black lg:w-[57%]">
                        * Valid for new Starbucks Rewards members for 7 days from sign up. Coupon
                        will be available in the offers tab of your Starbucks app following sign up
                        and may take up to 48 hours to arrive. Good at participating U.S. stores for
                        a handcrafted menu-sized beverage with qualifying purchase ($8 max value).
                        Qualifying purchase excludes alcohol, Starbucks Card and Card reloads. Limit
                        one. Cannot be combined with other offers or discounts. Excludes delivery
                        services. Sign up before 3/30/2025.
                    </p>
                </section>
                <footer className="h-full w-full p-6 text-black">
                    <div className="flex h-full w-full items-center gap-x-4">
                        <Link
                            href={'https://open.spotify.com/user/starbucks'}
                            target="_blank">
                            <FaSpotify className="h-10 w-10" />
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
                        <p className="py-4 text-xs text-gray-400 md:text-[16px]">
                            © 2025 Starbucks Coffee Company. All rights reserved.
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}

export default Login;
