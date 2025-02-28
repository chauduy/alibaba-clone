import Image from 'next/image';
import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';

function MainHeader() {
    return (
        <div
            className={`appPadding flex w-full items-center justify-between bg-white lg:border-b-[1px] lg:border-[#dddddd]`}
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
                <FiShoppingCart className="h-5 w-5" />
                <FaRegUser className="h-5 w-5" />
            </div>
        </div>
    );
}

export default MainHeader;
